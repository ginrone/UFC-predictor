import cheerio from 'cheerio'

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
    
    console.log(lowerData1)


    let a2 = cheerio.load(text2)

    toBack = "asdasdsad"
    
    return res.status(200).json({ toBack })


}

export default getData