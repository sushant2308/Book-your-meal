import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
function RestrauntList() {
    const [data,setdata] = useState([])
    function calculateDistance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist
      }
    useEffect(() => {
        const fetchData = async ()=>{
        try {
          const res = await axios.get('http://127.0.0.1:8000/api/restrauntlist/');
            
            
            let restrau=[]
            setdata(res.data);
            for(var key in res.data){
                var rest = {
                    id:res.data[key].id,
                    name: res.data[key].rdetails[0].name,
                    address: res.data[key].rdetails[0].address,
                    image:res.data[key].rdetails[0].image,
                    distance : calculateDistance(localStorage.getItem('latitude'),localStorage.getItem('longitude'),res.data[key].rdetails[0].latitude,res.data[key].rdetails[0].longitude,"K")
                }
                restrau.push(rest);
            
            }
            restrau.sort(function(a, b) { 
                return a.distance < b.distance;
              });
            setdata(restrau)
        }
        catch(err){
    
          }
      }
    
      fetchData();
    
      },[]);

  return (
        <div className="container" style={{marginTop:"2rem"}}>
            <h2 style={{color:"white"}}>Here are your   nearby Restraunts 🤭</h2>
            <div className="row">
                {data.map((item,i)=>(
                        <div className="col-md-3 col-sm-6" key={{i}}>
                            <div className="product-grid">
                            <div className="product-image">
                                <img className="pic-1" src={`http://127.0.0.1:8000`+item.image}/>
                            </div>
                            <div className="product-content">
                                <h3 className="title" style={{color:"white"}}><Link to={`/restraunt/`+item.id}>{item.name}</Link></h3>
                                <p style={{color:"white"}}> {item.distance} KM away</p>
                            </div>
                            </div>

                        </div>
                ))
                }
            </div>

            
        </div>

  );
}

export default RestrauntList;
