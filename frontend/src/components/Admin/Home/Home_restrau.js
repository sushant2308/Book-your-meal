
import './Home_restrau.css';
import {Link} from 'react-router-dom'

function Home_restrau() {
  return (
        <div className="container home-restrau">
           <h1>Please <Link to='/restraunt/login' className="home-links">Login</Link> or <Link to='/restraunt/register' className="home-links">Register</Link> to start your business with Book-Your-Meal</h1>
        </div>

  );
}

export default Home_restrau;