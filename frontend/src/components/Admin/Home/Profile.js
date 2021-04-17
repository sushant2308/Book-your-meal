
import React, { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentUser } from '../../../redux/User/useraction';

function Profile() {
    const dg = useSelector(state => state.user_reducer)
    const dispatch = useDispatch()
    function logout() {
        dispatch(setCurrentUser(null))
        localStorage.setItem('token',null);
       window.location.reload()
    }

  return (
      <div className="container">
        <nav className="navbar navbar-expand-lg">
            <span className="navbar-brand">{dg.current_user!=null ?dg.current_user.user.rdetails[0].name:"name"}</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span></span>
                    <span></span>
                    <span></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ">
                        <Link className="nav-link" to='/restraunt/add_food'>Add Food Items</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" onClick={logout} style={{border:"0px"}}>Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
        <div className="container">
            <h3>Your Added Products</h3>
            {
                dg.current_user!=null && 
                dg.current_user.user.items.map((item,i)=>(
                    <div className="col-md-3 col-sm-6">
                        <div className="product-grid">
                        <div class="product-image">
                            <img class="pic-1" src={item.image}/>
                        </div>
                        <div class="product-content">
                            <h3 class="title">{item.name}</h3>
                            <div class="price">Rs {item.price}</div>
                        </div>
                        </div>

                    </div>
                ))
            }
        </div>


      </div>



  );
}

export default Profile;
