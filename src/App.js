import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
API.configure(awsconfig);


function makeid() {
  return Math.random();
}

async function putData() { 
    const apiName = 'campaignBookApi';
    const path = '/people';
    const myInit = { // OPTIONAL
        body: {
          'id':makeid(),
          'firstName':'brad',
          'lastName':'perez',
          'age': '33'
        }, // replace this with attributes you need
        headers: {}, // OPTIONAL
    };

    return await API.put(apiName, path, myInit);
}

function App() {
  console.log(putData());
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
