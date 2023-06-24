import * as tf from '@tensorflow/tfjs';

import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { Input,Button } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'


export default function Home() {

  const checkData = async() => {
    var f1 = document.getElementById("f1").value
    var f2 = document.getElementById("f2").value
    var divSel = document.getElementById("divSel").value

    if(divSel===""){
      document.getElementById("errorDivision").hidden = false
    }
    else{
      document.getElementById("errorDivision").hidden = true
      if(f1===""||f2===""){
        document.getElementById("errorEmpty").hidden = false
      }
      else{
        document.getElementById("errorEmpty").hidden = true
        
        const returnVal = await getData();
  
        if(returnVal.toBack=='wrong'){
          document.getElementById("errorFalse").hidden = false
        }
        else{
          document.getElementById("errorFalse").hidden = true

          console.log(returnVal.toBack)
  
          // loadModel(dataInput);
        }
      }
    }
  }
  
  const getData = async() => {
    
    var f1 = document.getElementById("f1").value.split(" ").join("-").toLowerCase()
    var f2 = document.getElementById("f2").value.split(" ").join("-").toLowerCase()

    var toSend = f1+","+f2

    const res = await fetch('/api/getData?toSend='+toSend)
    const dl = await res.json()

    return dl;
  }

  const loadModel = async(dataInput) => {
    const model = await tf.loadLayersModel("https://raw.githubusercontent.com/ginrone/UFC-predictor/master/ufcpredictor/ufcpredictor_machinelearning/models/model.json");
    console.log("model loaded")
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

        <NumberInput defaultValue={2000} min={2000}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <Select placeholder='Select Division' id='divSel'>
          <option value='o1'>Flyweight (125)</option>
          <option value='o2'>Bantamweight (135)</option>
          <option value='o3'>Featherweight (145)</option>
          <option value='o4'>Lightweight (155)</option>
          <option value='o5'>Welterweight (170)</option>
          <option value='o6'>Middleweight (185)</option>
          <option value='o7'>Light Heavyweight (205)</option>
          <option value='o8'>Heavyweight (265)</option>
          <option value='o9'>Women's Strawweight (115)</option>
          <option value='o10'>Women's Flyweight (125)</option>
          <option value='o11'>Women's Bantamweight (135)</option>
          <option value='o12'>Women's Featherweight (145)</option>
        </Select>

        <div id="errorDivision" hidden={true}>
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Division has not been chosen</AlertTitle>
            <AlertDescription>Please select the division</AlertDescription>
          </Alert>
        </div>

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
