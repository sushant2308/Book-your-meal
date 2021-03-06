import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect ,Link} from 'react-router-dom';
function FoodList() {
    const [data,setdata] = useState([])
    useEffect(() => {
        const fetchData = async ()=>{
        try {
          const res = await axios.get('http://127.0.0.1:8000/api/allfoodlist/');
            console.log(res.data)
            setdata(res.data);
        }
        catch(err){
    
          }
      }
    
      fetchData();
    
      },[]);
  return (
        <div className="container" style={{marginTop:"2rem"}}>
            <h2 style={{color:"white"}}>Here are our  Dishes 😋</h2>
            <div className="row">
                {data.map((item,i)=>(
                        <div className="col-md-3 col-sm-6" key={{i}}>
                            <div className="product-grid">
                            <div className="product-image">
                                <img className="pic-1" src={`http://127.0.0.1:8000`+item.image}/>
                            </div>
                            <div className="product-content">
                                <h3 className="title" ><Link to={`/restraunt_info/`+item.parent_id}>{item.name}</Link></h3>
                                <div className="price">Rs {item.price}</div>
                            </div>
                            </div>

                        </div>
                ))
                }
            </div>

            
        </div>

  );
}

export default FoodList;
