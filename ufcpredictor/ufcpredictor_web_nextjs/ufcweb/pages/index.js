import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Input,Button } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

export default function Home() {

  const checkData = () => {
    var f1 = document.getElementById("f1").value
    var f2 = document.getElementById("f2").value

    if(f1===""||f2===""){
      document.getElementById("errorEmpty").hidden = false
    }
    else{
      document.getElementById("errorEmpty").hidden = true
      
      const returnVal = getData();

      if(returnVal==2){

      }
    }
  }
  
  const getData = async() => {
    
    var f1 = document.getElementById("f1").value.split(" ").join("-").toLowerCase()
    var f2 = document.getElementById("f2").value.split(" ").join("-").toLowerCase()

    var toSend = f1+","+f2

    const res = await fetch('/api/getData?toSend='+toSend)
    const dl = await res.json()

    console.log(dl)

    return 2;
  }

  return (
    
    <div className={styles.container}>
      <Head>
        <title>UFC Predictor</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          UFC Predictor
        </h1>
        <Input placeholder='Fighter 1' id='f1' />
        <Input placeholder='Fighter 2' id='f2'/>

        <div id="errorEmpty" hidden={true}>
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>A fighter name is empty</AlertTitle>
            <AlertDescription>Please fill up both fighter name</AlertDescription>
          </Alert>
        </div>

        <div id="errorFalse" hidden={true}>
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Incorrect fighter name</AlertTitle>
            <AlertDescription>Please make sure both names are correct</AlertDescription>
          </Alert>
        </div>
        
        <Button colorScheme='red' onClick={checkData}>Predict</Button>
      </main>

    </div>
  )
}
