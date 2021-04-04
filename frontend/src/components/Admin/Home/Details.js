
import axios from 'axios';
import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
function Details() {
    const [name, setname] = useState('')
    const [address, setaddress] = useState('')
    const [latitude, setlatitude] = useState('')
    const [longitude, setlongitude] = useState('')
    const [image, setimage] = useState(undefined)
    const [redirect, setredirect] = useState(null)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    }
    else{
        alert("Please Allow location excess")
    }

   console.log(image);
    const handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('name', name);
        form_data.append('address', address);
        form_data.append('latitude', latitude);
        form_data.append('longitude',longitude);
        form_data.append('image',image);
        let url = 'http://127.0.0.1:8000/api/restrau_detail/';
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
    function getPosition(position) {
            setlatitude(position.coords.latitude)
            setlongitude(position.coords.longitude)
        }
        if (redirect) {
            return <Redirect to={redirect} />
          }
  return (
      <div>
        {
            localStorage.getItem('token')!=null && <div className="container home-restrau">
            <h3 className="login-heading mb-4">FIll following details to continue</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-label-group">
                <input type="text" id="name" value={name} onChange={(e)=>setname(e.target.value)} className="form-control" placeholder="Email address" required />
                <label for="name">Enter your Restraunt name</label>
                </div>

                <div className="form-label-group">
                <input type="text" id="address" value={address} onChange={(e)=>setaddress(e.target.value)} className="form-control" placeholder="Password" required/>
                <label for="address">Enter your restraunt address</label>
                </div>
                <div className="form-label-group">
                <input type="file" id="image" onChange={(e)=>setimage(e.target.files[0])} required/>
                <label for="password">Upload your restraunt image</label>
                </div>
                <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Submit</button>

            </form>
</div>
        }
      </div>



  );
}

export default Details;
