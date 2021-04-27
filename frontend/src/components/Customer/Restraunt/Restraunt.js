
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Restraunt() {
    let { id } = useParams();
    const [data,setdata] = useState(null)
    useEffect(() => {
        const fetchData = async ()=>{
        try {
          const res = await axios.get(`http://127.0.0.1:8000/api/restraunt/`+id);
     
            console.log(res)
            setdata(res.data);
        }
        catch(err){
    
        }
      }
    
      fetchData();
    
      },[]);

  return (
    <div className="container-fluid" style={{marginTop:"1rem"}}>
        
    {data ? 
        <div style={{color:"white"}}>
            <h3>{data.rdetails[0].name}</h3>
            
                {data.items.map((item,i)=>(
                        <div className="col-md-3 col-sm-6" key={{i}}>
                            <div className="product-grid">
                            <div className="product-image">
                                <img className="pic-1" src={`http://127.0.0.1:8000`+item.image}/>
                            </div>
                            <div className="product-content">
                                <h3 className="title" >{item.name}</h3>
                                <div className="price">Rs {item.price}</div>
                            </div>
                            </div>

                        </div>
                ))
                }
        </div>:
    <p style={{color:"white"}}>
        Loading...
        </p>}
        
    </div>

  );
}

export default Restraunt;
