
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
function App() {
  return (
    <Router>
      <div className="App">
       

        
        <Navbar/>
        <Switch>
            <Route path='/'  component={Home} exact/>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
