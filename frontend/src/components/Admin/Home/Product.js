
import axios from 'axios';
import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
function Product() {
    const [name, setname] = useState('')
    const [price, setprice] = useState('')
    const [image, setimage] = useState(undefined)
    const [redirect, setredirect] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('name', name);
        form_data.append('price', price);
        form_data.append('image',image);
        let url = 'http://127.0.0.1:8000/api/add_food/';
        let token=localStorage.getItem('token')
        axios.post(url, form_data, {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `token ${token}`
        }
        })
        .then(res => {
            setredirect("/restraunt");
        
        })
        .catch(err =>alert("Some Error occured"))
    };
    if (redirect) {
        return <Redirect to={redirect} />
        }
  return (
      <div>
        
            <div className="container home-restrau">
                <h3 className="login-heading mb-4">FIll following details to continue</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-label-group">
                    <input type="text" id="name" value={name} onChange={(e)=>setname(e.target.value)} className="form-control" placeholder="Email address" required />
                    <label for="name">Enter your Food Item name</label>
                    </div>

                    <div className="form-label-group">
                    <input type="text" id="address" value={price} onChange={(e)=>setprice(e.target.value)} className="form-control" placeholder="Password" required/>
                    <label for="address">Enter your Food item price</label>
                    </div>
                    <div className="form-label-group">
                    <input type="file" id="image" onChange={(e)=>setimage(e.target.files[0])} required/>
                    <label for="password">Upload your Food item image</label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Submit</button>

                </form>
            </div>
        
      </div>



  );
}

export default Product;
