
import './Search.css';
import {Link} from 'react-router-dom'
function Search() {
  return (
    <div className="d-flex ml-auto">
        <input type="search" className="form-control rounded" placeholder="Type your Favourite dish or restraunt" aria-label="Search"
            aria-describedby="search-addon" />
        <button id="search-button" type="button" className="btn btn-primary">Search</button>
    </div>

  );
}

export default Search;
