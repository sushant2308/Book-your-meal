
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useParams ,Link} from 'react-router-dom';
function Category() {
    let { id } = useParams();
    const [data,setdata] = useState(null)
    useEffect(() => {
        const fetchData = async ()=>{
        try {
          const res = await axios.get(`http://127.0.0.1:8000/api/food_by_category/`+id);
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
            <h3>Here are some of our {id}</h3>
            
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
        </div>:
    <p style={{color:"white"}}>
        Loading...
        </p>}
        
    </div>

  );
}

export default Category;
