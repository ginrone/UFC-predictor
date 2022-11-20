from bs4 import BeautifulSoup
import requests
import csv

def convertToInches(data):

    result = data.split("'")

    result[0] = float(result[0]) * 12
    result[1] = float(result[1])

    return float(result[0] + result[1])

def fetchPrint(pageData):
    pageData = str(pageData)
    homePage = requests.get("http://ufcstats.com/statistics/events/completed?page="+pageData)
    homePage = BeautifulSoup(homePage.content,"html.parser")

    getEventLink = homePage.find_all('a',attrs={'class':'b-link b-link_style_black'})
    eventLink = []

    for item in getEventLink:
        eventLink.append(item['href'])

    # eventLink = [eventLink[0]]

    progress = len(eventLink)
    allFights = []

    for item in eventLink:
        req = requests.get(item)
        req = BeautifulSoup(req.content,"html.parser")

        pickupData = req.find_all('td',attrs={'class': 'b-fight-details__table-col l-page_align_left'})
        pickupEvent = req.find_all('li',attrs={'class': 'b-list__box-list-item'})

        fighterList = []
        divisionList = []
        winByList = []
        venueList = []

        for i in range(len(pickupData)):
            if i % 3 == 0:
                data = pickupData[i].find_all('a',attrs={'class':'b-link b-link_style_black'})

                fighterList.append((data[0].text.strip(),data[0]['href'],data[1].text.strip(),data[1]['href']))
            elif i % 3 == 1:
                data = pickupData[i].find_all('p',attrs={'class':'b-fight-details__table-text'})

                divisionList.append(data[0].text.strip())
            elif i % 3 == 2:
                data = pickupData[i].find_all('p',attrs={'class':'b-fight-details__table-text'})

                winByList.append(data[0].text.strip())

        for i in range(len(pickupEvent)):
            if i == 0:
                eV = pickupEvent[i].text.strip().replace("\n","").replace("Date:","").replace(" ","").split(",")
                venueList.append(float(eV[1]))

            elif i == 1:
                eV = pickupEvent[i].text.strip().replace("\n","").replace("Location:","").replace(" ","").split(",")
                venueList.append(str(eV[0]))
        
        fightList = []

        for i in range(len(fighterList)):
            fightList.append((fighterList[i][0],fighterList[i][1],fighterList[i][2],fighterList[i][3],divisionList[i],winByList[i],venueList[0],venueList[1]))

        for f in fightList:
            allFights.append(f)

        print("Fetching: ",progress)
        progress = progress - 1

    with open('fightDataNew'+pageData+'.csv','w',encoding='UTF8') as f:

        writer = csv.writer(f)

        column = ['A_Fighter','B_Fighter','Division','WinBy','EventYear','EventLocation',
        'A_height','A_weight','A_range','A_Stance','A_YearBirth','A_SigStrikeLanded','A_SigStrikeAcc',
        'A_SigStrikeAbsorb','A_SigStrikeDef','A_TakedownAvg','A_TakedownAcc','A_TakedownDef','A_SubAvg',
        'B_height','B_weight','B_range','B_Stance','B_YearBirth','B_SigStrikeLanded','B_SigStrikeAcc',
        'B_SigStrikeAbsorb','B_SigStrikeDef','B_TakedownAvg','B_TakedownAcc','B_TakedownDef','B_SubAvg']

        writer.writerow(column)

        progressWrite = len(allFights)

        for fight in allFights:

            toWrite = []

            r1 = requests.get(fight[1])
            r2 = requests.get(fight[3])

            r1 = BeautifulSoup(r1.content,"html.parser")
            r2 = BeautifulSoup(r2.content,"html.parser")

            data1 = r1.find_all('li',attrs={'class': 'b-list__box-list-item b-list__box-list-item_type_block'})
            data2 = r2.find_all('li',attrs={'class': 'b-list__box-list-item b-list__box-list-item_type_block'})
            f1 = []
            f2 = []

            for i in range(len(data1)):
                
                f1.append(data1[i].text.strip().replace("\n","").replace(" ","")
                .replace("Height:","")
                .replace("Weight:","")
                .replace("Reach:","")
                .replace("STANCE:","")
                .replace("DOB:","")
                .replace("SLpM:","")
                .replace("Str.Acc.:","")
                .replace("SApM:","")
                .replace("Str.Def:","")
                .replace("TDAvg.:","")
                .replace("TDAcc.:","")
                .replace("TDDef.:","")
                .replace("Sub.Avg.:","")
                .replace('"',"")
                .replace("lbs.","")
                .replace("%",""))

                f2.append(data2[i].text.strip().replace("\n","").replace(" ","")
                .replace("Height:","")
                .replace("Weight:","")
                .replace("Reach:","")
                .replace("STANCE:","")
                .replace("DOB:","")
                .replace("SLpM:","")
                .replace("Str.Acc.:","")
                .replace("SApM:","")
                .replace("Str.Def:","")
                .replace("TDAvg.:","")
                .replace("TDAcc.:","")
                .replace("TDDef.:","")
                .replace("Sub.Avg.:","")
                .replace('"',"")
                .replace("lbs.","")
                .replace("%",""))

            f1.pop(9)
            f2.pop(9)

            if f1[0] == '--':
                pass
            else:
                f1[0] = convertToInches(f1[0])

            if f2[0] == '--':
                pass
            else:
                f2[0] = convertToInches(f2[0])

            for i in range(len(f1)):
                if i == 4:
                    if f1[i] == "--":
                        pass
                    else:
                        getYear1 = f1[i].split(",")
                        f1[i] = float(getYear1[1])

                    if f2[i] == "--":
                        pass
                    else:
                        getYear2 = f2[i].split(",")
                        f2[i] = float(getYear2[1])
                else:
                    if (i < 3 or i > 3):
                        if f1[i] == "--":
                            pass
                        else:
                            f1[i] = float(f1[i])
                        
                        if f2[i] == "--":
                            pass
                        else:
                            f2[i] = float(f2[i])

            for i in range(len(fight)):
                if (i == 1 or i == 3):
                    pass
                else:
                    toWrite.append(fight[i])

            for rowData in f1:
                toWrite.append(rowData)
            
            for rowData in f2:
                toWrite.append(rowData)

            print("Writing: ",progressWrite)
            progressWrite = progressWrite - 1 

            writer.writerow(toWrite)

for i in range(18,26):
    fetchPrint(i)
    print("Batch Completed: ",i)