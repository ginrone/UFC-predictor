import React, {useState,useEffect} from 'react';
import axios from 'axios'

const baseURL = 'http://ufcstats.com/statistics/fighters'

function FetchData(){
    const data = axios.get(baseURL,{ crossdomain: true });

    return null;
}

export default FetchData