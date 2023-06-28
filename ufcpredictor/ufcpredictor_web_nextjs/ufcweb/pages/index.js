import * as tf from '@tensorflow/tfjs';
import * as dfd from "danfojs";

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

// import * as modelJson from './api/model.json';



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

          loadModel(returnVal.toBack);
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

  const loadModel = async(arg) => {
    const model = await tf.loadLayersModel("https://raw.githubusercontent.com/ginrone/UFC-predictor/master/ufcpredictor/ufcpredictor_machinelearning/models/model.json");

    // const modelData = await fetch('/api/getJson')
    // const model = await tf.loadLayersModel(modelData)

    let scaler = new dfd.StandardScaler()

    let sf = new dfd.Series([100,1000,2000, 3000])
    sf.print()

    scaler.fit(sf)

    let sf_enc = scaler.transform(sf)
    sf_enc.print()

    const result = model.predict(tf.tensor([[0.9392239352993331,-0.0693172795261538,-0.33242030337312767,-0.2592097073045762,0.10442379070597613,1.929874245385623,1.0099054702175436,0.22693802622324347,0.952844507615834,-0.19506555157576771,-0.0307883706763709,0.5568141758321692,-0.47787981505475324,-0.35406298823176274,-0.6208336843167133,-0.2592097073045762,1.1855207911980776,0.9362426742074457,-0.06178496764537003,1.1158233613560744,-0.2933995414382531,-0.298056073152338,0.18526321557226672,0.35163782634761176,-0.47787981505475324,-0.31664546491805656,-0.09208932109578348,-0.33754429320570767,-0.21480231820593265,-0.2979125181330732,-0.32381167483344026,2.1721766329716985,-0.38904175541074315,-0.4540578103453158,-0.1653094717148596,-0.06564189983640827,-0.17544263094290105,-0.2031735350548299,-0.03589945003660451,0.5827008064908247,-0.5076577414691509,-0.2193532259967786,-0.03589945003660451,0.5827008064908247,-0.5076577414691509,-0.2193532259967786,]]))

    console.log(result.dataSync()[0])
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
