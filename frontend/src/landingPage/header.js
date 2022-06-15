import React from 'react'
import './css/style.css'
import { Link, withRouter } from 'react-router-dom'
import logo from '../images/logo.png';
const Header = () => {
    return (
        <div>
            <header id="header" className="fixed-top ">
                <div className="container d-flex align-items-center">
                    <h1 className="text-white mr-auto"><img src={logo} draggable="false" style={{maxHeight: "40px"}}alt="SVVV logo" /> SMARTHIRE</h1>
                    <Link to="/StudentLogin"><button className="get-started-btn scrollto">Login</button></Link>
                </div>
            </header>
        </div>
    )
}

export default withRouter(Header);