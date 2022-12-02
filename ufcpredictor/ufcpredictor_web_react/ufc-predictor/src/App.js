import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as dfd from "danfojs"

function convertData() {
  // const dfd = require("danfojs")

  // let scaler = new dfd.StandardScaler()

  // let sf = new dfd.Series([200.3,1000,1,0,100000])
  // sf.print()

  // let sf_enc = scaler.transform(sf)
  // sf_enc.print()

  const data = tf.tensor2d([[0.9392239352993331,-0.0693172795261538,-0.33242030337312767,-0.2592097073045762,0.10442379070597613,1.929874245385623,1.0099054702175436,0.22693802622324347,0.952844507615834,-0.19506555157576771,-0.0307883706763709,0.5568141758321692,-0.47787981505475324,-0.35406298823176274,-0.6208336843167133,-0.2592097073045762,1.1855207911980776,0.9362426742074457,-0.06178496764537003,1.1158233613560744,-0.2933995414382531,-0.298056073152338,0.18526321557226672,0.35163782634761176,-0.47787981505475324,-0.31664546491805656,-0.09208932109578348,-0.33754429320570767,-0.21480231820593265,-0.2979125181330732,-0.32381167483344026,2.1721766329716985,-0.38904175541074315,-0.4540578103453158,-0.1653094717148596,-0.06564189983640827,-0.17544263094290105,-0.2031735350548299,-0.03589945003660451,0.5827008064908247,-0.5076577414691509,-0.2193532259967786,-0.03589945003660451,0.5827008064908247,-0.5076577414691509,-0.2193532259967786]]);

  // // sf_enc.print()

  return data;
}

async function runModel(){

  const model = await tf.loadLayersModel("https://raw.githubusercontent.com/ginrone/UFC-predictor/master/ufcpredictor/ufcpredictor_machinelearning/models/model.json");
  console.log("model loaded")

  const data = convertData();

  const pred = model.predict(data);
  const outputValue = pred.dataSync();
  console.log(Number(outputValue[0] > 0.5))
}

function App() {

  runModel();

  return (
    <div className="App">
      <h1> This is just testing </h1>
    </div>
  );
}

export default App;
