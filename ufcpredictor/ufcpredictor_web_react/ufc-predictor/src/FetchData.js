import React, {useState,useEffect} from 'react';
import axios from 'axios'

function FetchData(){
    const [fData,setFData] = useState([])
    
    useEffect(()=>{
        axios.get('http://ufcstats.com/statistics/fighters?char=a&page=all')
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    })
    
    return(<div>
        {fData}
    </div>)
}

export default FetchData