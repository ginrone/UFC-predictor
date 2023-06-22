import cheerio from 'cheerio'

/*
Data that is needed for ML

'EventYear', 'A_height', 'A_weight', 'A_range', 'A_YearBirth',
       'A_SigStrikeLanded', 'A_SigStrikeAcc', 'A_SigStrikeAbsorb',
       'A_SigStrikeDef', 'A_TakedownAvg', 'A_TakedownAcc', 'A_TakedownDef',
       'A_SubAvg', 'B_height', 'B_weight', 'B_range', 'B_YearBirth',
       'B_SigStrikeLanded', 'B_SigStrikeAcc', 'B_SigStrikeAbsorb',
       'B_SigStrikeDef', 'B_TakedownAvg', 'B_TakedownAcc', 'B_TakedownDef',
       'B_SubAvg', 'Div__Bantamweight', 'Div__Catch Weight',
       'Div__Featherweight', 'Div__Flyweight', 'Div__Heavyweight',
       'Div__Light Heavyweight', 'Div__Lightweight', 'Div__Middleweight',
       'Div__Welterweight', 'Div__Women's Bantamweight',
       'Div__Women's Featherweight', 'Div__Women's Flyweight',
       'Div__Women's Strawweight', 'A__OpenStance', 'A__Orthodox',
       'A__Southpaw', 'A__Switch', 'B__OpenStance', 'B__Orthodox',
       'B__Southpaw', 'B__Switch'
*/

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
    
    let a1 = cheerio.load(text1)

    const lowerData1 = a1('.c-bio__text')
    const lowerData1Array = []

    lowerData1.each(function(i,elem){
        lowerData1Array[i] = a1(this).text()
    })
    


    let a2 = cheerio.load(text2)

    toBack = "asdasdsad"
    
    return res.status(200).json({ toBack })


}

export default getData