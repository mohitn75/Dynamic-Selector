import logo from './logo.svg';
import './App.css';
import Grid from './Grid'; 

function App() {
  return (
    <div className="App">
      <h1>Dynamic Grid Selector</h1>
      <div className='grid'>
        <Grid Rows = {10} Cols = {10}></ Grid>
      </div>
    </div>
  );
}

export default App;
