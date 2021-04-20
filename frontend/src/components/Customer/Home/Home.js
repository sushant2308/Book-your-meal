
import './Home.css';
import Details from './Details';
import {Link} from 'react-router-dom';
import axios from 'axios';
import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { setCurrentUser } from '../../../redux/User/useraction';
function Home() {
  const [data,setdata]=useState([]);
  const dg = useSelector(state => state.user_reducer)
  const dispatch = useDispatch()
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
        dispatch(setCurrentUser(res.data))
        console.log(data) 
    }
    catch(err){

      }
  }

  fetchData();

  },[]);
  return (
        <div className="container-fluid home">
            <div className="home-img"> </div>
        </div>

  );
}

export default Home;
