import * as cheerio from 'cheerio'

/*
Data that is needed for ML

'EventYear', a
'A_height', a
'A_weight', a
'A_range', a
'A_YearBirth', a
       
'A_SigStrikeLanded', a
'A_SigStrikeAcc', a
'A_SigStrikeAbsorb', a
       
'A_SigStrikeDef', a
'A_TakedownAvg', a
'A_TakedownAcc', a
'A_TakedownDef', a
       
'A_SubAvg', a

'B_height', 
'B_weight', 
'B_range', 
'B_YearBirth',
       
'B_SigStrikeLanded', 
'B_SigStrikeAcc', 
'B_SigStrikeAbsorb',
       
'B_SigStrikeDef', 
'B_TakedownAvg', 
'B_TakedownAcc', 
'B_TakedownDef',
       
'B_SubAvg', 

'Div__Bantamweight', 
'Div__Catch Weight',
       
'Div__Featherweight', 
'Div__Flyweight', 
'Div__Heavyweight',
       
'Div__Light Heavyweight', 
'Div__Lightweight', 
'Div__Middleweight',
       
'Div__Welterweight', 
'Div__Women's Bantamweight',
       
'Div__Women's Featherweight', 
'Div__Women's Flyweight',
       
'Div__Women's Strawweight', 

'A__OpenStance', 
'A__Orthodox',
       
'A__Southpaw', 
'A__Switch', 

'B__OpenStance', 
'B__Orthodox',
       
'B__Southpaw', 
'B__Switch'
*/

// function scrapData(data,arg){

//     const fighterData = cheerio.load(data)
//     const lowerData = fighterData(arg)
//     const lowerDataArray = []

//     for(let i=0;i<lowerData.length;i++){
//         lowerDataArray.push(lowerData.eq(i).text())
//     }

//     return lowerDataArray

// }

function scrapData(data,arg,label){

    const fighterData = cheerio.load(data)
    const returnData = []
    
    const statsData = fighterData(arg)
    const statsLabel = fighterData(label)

    for(let i=0;i<statsData.length;i++){
        returnData.push([statsLabel.eq(i).text(),statsData.eq(i).text()])
    }

    return returnData

}

function scrapDataCircle(data,arg){

    const fighterData = cheerio.load(data)
    const returnData = []
    
    const statsData = fighterData(arg)

    for(let i=0;i<statsData.length;i++){
        returnData.push(statsData.eq(i).text())
    }

    return returnData
}

function extractData(data,arg){

    const selectedData = []

    if(arg == 1){

        for (let i = 0; i < data.length; i++) {

            if(data[i][0] == 'Age' || data[i][0] == 'Height' || data[i][0] == 'Weight' || data[i][0] == 'Reach'  ){
                selectedData.push(data[i][1].replaceAll(' ',"").replaceAll('\n',"").replaceAll('%',""))
            }
        }

    }
    else if(arg == 2){

        for (let i = 0; i < data.length; i++) {

            if(data[i][0] == 'Sig. Str. Landed' || data[i][0] == 'Sig. Str. Absorbed' || data[i][0] == 'Takedown avg' || data[i][0] == 'Submission avg' || data[i][0] == 'Sig. Str. Defense' || data[i][0] == 'Takedown Defense' ){
                selectedData.push(data[i][1].replaceAll(' ',"").replaceAll('\n',"").replaceAll('%',""))
            }
        }

    }
    else if(arg == 3){
        selectedData.push(data[0].replaceAll(' ',"").replaceAll('\n',"").replaceAll('%',""))
        selectedData.push(data[1].replaceAll(' ',"").replaceAll('\n',"").replaceAll('%',""))
    }

    return selectedData
}

const getData = async (req, res) => {

    const received = req.query.toSend.split(",")
    let toBack = "wrong"

    const name1 = received[0]
    const name2 = received[1]

    const str1 = `https://www.ufc.com/athlete/${name1}`
    const resp1 = await fetch(str1)

    if(resp1.status == 404){
        return res.status(200).json({ toBack })
    }

    const text1 = await resp1.text()

    const str2 = `https://www.ufc.com/athlete/${name2}`
    const resp2 = await fetch(str2)

    if(resp2.status == 404){
        return res.status(200).json({ toBack })
    }

    const text2 = await resp2.text()

    const lowerData1 = extractData(scrapData(text1,'.c-bio__text','.c-bio__label'),1)
    const upperData1 = extractData(scrapData(text1,'.c-stat-compare__number','.c-stat-compare__label'),2)
    const graphData1 = extractData(scrapDataCircle(text1,'.e-chart-circle__percent'),3)

    const lowerData2 = extractData(scrapData(text2,'.c-bio__text','.c-bio__label'),1)
    const upperData2 = extractData(scrapData(text2,'.c-stat-compare__number','.c-stat-compare__label'),2)
    const graphData2 = extractData(scrapDataCircle(text2,'.e-chart-circle__percent'),3)

    toBack = lowerData1.concat(lowerData2, upperData1, upperData2, graphData1, graphData2)
    
    return res.status(200).json({ toBack })


}

export default getData