
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Navbar from './components/Customer/Navbar/Navbar';
import Login from './components/Customer/Login/Login';
import Signup from './components/Customer/Signup/Signup';
import Home from './components/Customer/Home/Home';
import Register from './components/Admin/Register/Register';
import Login_restrau from './components/Admin/Login/Login_restrau';
import Home_restrau from './components/Admin/Home/Home_restrau';
import Product from './components/Admin/Home/Product';
import Restraunt from './components/Customer/Restraunt/Restraunt';
import Category from './components/Customer/Category/Category';
function App() {
  return (
    <Router>
      
        <div className="App">
            <Switch>
            <Route path='/restraunt'  component={Home_restrau} exact/>
              <Route path='/restraunt/login' component={Login_restrau} exact/>
              <Route path='/restraunt/register' component={Register} exact/>   
              <Route path='/restraunt/add_food' component={Product} exact/>   
              <Route  path='' component={Customer} exact/>

            </Switch>  
        </div>
     

    </Router>

  );
}
const Customer = () => (
    <div>
        <Navbar/>
        <Switch>
          <Route path='/'  component={Home} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/signup' component={Signup} exact/>
          <Route path='/restraunt_info/:id' component={Restraunt} exact/>
          <Route path='/category/:id' component={Category} exact/>
        </Switch>

    </div>
)
export default App;
