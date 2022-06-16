import React from 'react'
import './css/style.css'
import { Link, withRouter } from 'react-router-dom'
import logo from '../image/logo.png';
const Header = () => {
    return (
        <div>
            <header id="header" className="fixed-top ">
                <div className="container d-flex align-items-center">
                    <h1 className="text-white"><img src={logo} draggable="false" style={{height: "30%",width: "30%"}} alt="SmartHire logo" /> </h1>
                    <Link to="/TraineeLogin"><button className="get-started-btn scrollto">Login</button></Link>
                </div>
            </header>
        </div>
    )
}

export default withRouter(Header);