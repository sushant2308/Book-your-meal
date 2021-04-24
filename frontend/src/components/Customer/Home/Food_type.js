import {Link} from 'react-router-dom';
import Biryani from './Images/Biryani.jpg';
import CholeBhature from './Images/Chole-Bhature.jpg';
import Pizza from './Images/Pizza.jpg';
import Thali from './Images/Thali.jpg';
import Burger from './Images/Burger.jpg';
import RajmaChawal from './Images/Rajma-Chawal.jpg';
import React from 'react';
function Food_type() {
    console.log(Biryani)
  return (
        <div className="container" style={{marginTop:"2rem"}}>
            <h3 style={{color:"white"}}>Checkout What We are Serving 😋</h3>
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card" style={{width:"10rem",border:"0"}}>
                        <img className="card-img-top" src={Biryani}  style={{height:"180px",width:"200px"}} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title" style={{color:"white"}}><Link to="/Biryani">Biryani</Link></h5>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card" style={{width:"10rem",border:"0"}}>
                        <img className="card-img-top" src={Pizza} style={{height:"180px",width:"200px"}} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title" style={{color:"white"}}><Link to="/Pizza">Pizza</Link></h5>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card" style={{width:"10rem",border:"0"}}>
                        <img className="card-img-top" src={Burger} style={{height:"180px",width:"200px"}} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title" style={{color:"white"}}><Link to="/Burger">Burger</Link></h5>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card" style={{width:"10rem",border:"0"}}>
                        <img className="card-img-top" src={CholeBhature} style={{height:"180px",width:"200px"}} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title" style={{color:"white"}}><Link to="/Chole-Bhature">Chole-Bhature</Link></h5>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card" style={{width:"10rem",border:"0"}}>
                        <img className="card-img-top" src={RajmaChawal} style={{height:"180px",width:"200px"}} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title" style={{color:"white"}}><Link to="/Rajma-Chawal">Rajma-Chawal</Link></h5>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card" style={{width:"10rem",border:"0"}}>
                        <img className="card-img-top" src={Thali} style={{height:"180px",width:"200px"}} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title" style={{color:"white"}}><Link to="/Thali">Thali</Link></h5>
                        </div>
                    </div>
                </div>
            </div>
            

            
        </div>

  );
}

export default Food_type;
