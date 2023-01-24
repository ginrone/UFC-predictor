import cheerio from 'cheerio'

const getData = async (req, res) => {

    try {
        const received = req.query.toSend.split(",")

        const name1 = received[0]
        const name2 = received[1]

        const str1 = `https://www.ufc.com/athlete/${name1}`
        const resp1 = await fetch(str1)
        const text1 = await resp1.text()

        const str2 = `https://www.ufc.com/athlete/${name2}`
        const resp2 = await fetch(str2)
        const text2 = await resp2.text()
        
        let $ = cheerio.load(text2)
        let test = $('.e-chart-circle__percent').text()

        console.log(test)
        
        return res.status(200).json({ test })

    } catch (error) {
        console.log(error)
    }

}

export default getData