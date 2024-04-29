//import logo from './logo.svg';
//import './App.css';
import Navigation from './navigation.js';

function MyButton(){
  function handleClick(){
    alert('You clicked me!');
  }

  return(
    <button onClick={handleClick}>
      Click me
    </button>
  );
}

export default function MyApp() {
  return(
    <div classname="App">
      <Navigation />
    </div>
  );
}
/*
function App() {
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

export default App;*/
