import * as cheerio from 'cheerio'

/*
Data that is needed for ML

'EventYear', 
'A_height', a
'A_weight', a
'A_range', a
'A_YearBirth', a
       
'A_SigStrikeLanded', 
'A_SigStrikeAcc', 
'A_SigStrikeAbsorb',
       
'A_SigStrikeDef', 
'A_TakedownAvg', 
'A_TakedownAcc', 
'A_TakedownDef',
       
'A_SubAvg', 

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

function scrapData(data){

    const fighterData = cheerio.load(data)
    const lowerData = fighterData('.c-bio__text')
    const lowerDataArray = []

    for(let i=0;i<lowerData.length;i++){
        lowerDataArray.push(lowerData.eq(i).text())
    }

    return lowerDataArray

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

    const data1 = scrapData(text1)
    const data2 = scrapData(text2)

    console.log(data1)
    console.log(data2)

    toBack = "asdasdsad"
    
    return res.status(200).json({ toBack })


}

export default getData