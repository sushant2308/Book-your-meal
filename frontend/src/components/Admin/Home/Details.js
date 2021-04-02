
import axios from 'axios';
import React,{useState} from 'react';
function Details() {
    const [name, setname] = useState('')
    const [address, setaddress] = useState('')
    const [latitude, setlatitude] = useState('')
    const [longitude, setlongitude] = useState('')
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    }
    else{
        alert("Please Allow location excess")
    }

   
    const handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('name', name);
        form_data.append('address', address);
        form_data.append('latitude', latitude);
        form_data.append('longitude',longitude);
        let url = 'http://127.0.0.1:8000/api/restrau_detail/';
        axios.post(url, form_data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
        })
            .then(res => {
            localStorage.setItem('token',res.data.token);
        
            })
            .catch(err =>alert("Wrong email or password"))
    };
    function getPosition(position) {
            console.log(position.coords.latitude, position.coords.longitude);
            setlatitude(position.coords.latitude)
            setlongitude(position.coords.longitude)
        }
  return (
        <div className="container home-restrau">
                    <h3 className="login-heading mb-4">FIll following details to continue</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-label-group">
                        <input type="email" id="email" value={name} onChange={(e)=>setname(e.target.value)} className="form-control" placeholder="Email address" required />
                        <label for="email">Enter your Restraunt name</label>
                        </div>

                        <div className="form-label-group">
                        <input type="password" id="password" value={address} onChange={(e)=>setaddress(e.target.value)} className="form-control" placeholder="Password" required/>
                        <label for="password">Enter your restraunt address</label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Submit</button>

                    </form>
        </div>

  );
}

export default Details;
