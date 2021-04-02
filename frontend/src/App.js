
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Navbar from './components/Customer/Navbar/Navbar';
import Login from './components/Customer/Login/Login';
import Signup from './components/Customer/Signup/Signup';
import Home from './components/Customer/Home/Home';
import Register from './components/Admin/Register/Register';
import Login_restrau from './components/Admin/Login/Login_restrau';
import Home_restrau from './components/Admin/Home/Home_restrau';
function App() {
  return (
    <Router>
      
        <div className="App">
            <Switch>
              <Route  path='/' component={Customer} exact/>
              <Route path='/restraunt'  component={Home_restrau} exact/>
              <Route path='/restraunt/login' component={Login_restrau} exact/>
              <Route path='/restraunt/register' component={Register} exact/>   
            </Switch>  
        </div>
     

    </Router>

  );
}
const Customer = () => (
    <div>
        <Navbar/>
        <Route path='/'  component={Home} exact/>
        <Route path='/login' component={Login} exact/>
        <Route path='/signup' component={Signup} exact/>
    </div>
)
export default App;
