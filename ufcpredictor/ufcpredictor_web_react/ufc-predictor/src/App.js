import './App.css';
import * as tf from '@tensorflow/tfjs';

async function runModel(){

  modelUrl = "https://raw.githubusercontent.com/ginrone/UFC-predictor/master/ufcpredictor/ufcpredictor_machinelearning/models/model.json";
  const model = await tf.loadGraphModel(modelUrl);
  console.log("model is loaded")
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
