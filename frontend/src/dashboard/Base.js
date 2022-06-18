import React, { useState } from 'react'
import Navigation from './Navigation'
import { adminLogout } from '../auth/helper'
import { Redirect } from 'react-router-dom'
import logo from '../image/adminLogo.png';

const Base = ({
    children
}) => {

    const [value, setvalue] = useState({
        logoutmsg: false
    })

    const { logoutmsg } = value;

    const logout = () => {
        adminLogout();
        setvalue({ ...value, logoutmsg: true });
    }
    const performlogout = () => {
        return (
            logoutmsg && (
                <Redirect to="/Admin" />
            )
        )
    }

    return (
        <div>
            {performlogout()}
            <nav className="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white" id="sidenav-main">
                <div className="scrollbar-inner">
                    <div className="sidenav-header align-items-center mb-7">
                        <span className="navbar-brand">
                            <br></br>
                            <img src={logo} alt="SmartHire logo" style={{ maxHeight: "120px" }} />
                        
                        </span>
                    </div>
                    <hr />
                    <Navigation />
                </div>
            </nav>
            <div className="main-content" id="panel">
                <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav align-items-center  ml-md-auto ">
                                <li className="nav-item d-xl-none">
                                    <div className="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin"
                                        data-target="#sidenav-main">
                                        <div className="sidenav-toggler-inner">
                                            <i className="sidenav-toggler-line"></i>
                                            <i className="sidenav-toggler-line"></i>
                                            <i className="sidenav-toggler-line"></i>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul className="navbar-nav align-items-center ml-auto ml-md-0">
                             
                                <li className="nav-item">
                                    <div className="media align-items-center">
                                        <div className="media-body ml-2">
                                            <button className="font-weight-bold" style={{color:"white"}} onClick={logout}>Logout</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Base;
