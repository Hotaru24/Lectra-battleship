import './App.css';
import Arena from './Components /Arena/Arena.jsx';
import Dashboard from './Components /Dashboard/Dashboard.jsx';
import Navbar from './Components /Navbar/Navbar.jsx';

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <Arena/>
      <Dashboard/>
    </div>
  );
}

export default App;
