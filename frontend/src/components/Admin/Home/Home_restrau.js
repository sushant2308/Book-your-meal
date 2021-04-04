
import './Home_restrau.css';
import {Link} from 'react-router-dom'
import Details from './Details';
import axios from 'axios';
import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { setCurrentUser } from '../../../redux/User/useraction';
function Home_restrau() {
  const [data,setdata]=useState([]);
  const dispatch = useDispatch()
  const dg = useSelector(state => state.user_reducer)
  useEffect(() => {
    const fetchData = async ()=>{
    try {
      let token=localStorage.getItem('token')
      console.log(token)
      const res = await axios.get(`http://127.0.0.1:8000/api/me`,{
        headers: {
            'Authorization': `token ${token}`
          }
      });
      setdata(res.data.rdetails);
      dispatch(setCurrentUser(data))
      console.log(res)
      
    }
    catch(err){

    }
}

fetchData();

},[]);
console.log(dg)
  return (
        <div className="container home-restrau">
          {
            localStorage.getItem('token')==null &&  <h1>Please <Link to='/restraunt/login' className="home-links">Login</Link> or <Link to='/restraunt/register' className="home-links">Register</Link> to start your business with Book-Your-Meal</h1>

          }
          {
            data.length==0  && <Details/>
          }
        
   
        </div>

  );
}

export default Home_restrau;
