
import './Navbar.css';
import {Link} from 'react-router-dom'
import Search from '../Search/Search';
function Navbar() {
  return (
        <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="\">Book-Your-Meal</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <Search/>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link">Signup</Link>
                    </li>
                
                </ul>
            </div>

        </nav>

  );
}

export default Navbar;
