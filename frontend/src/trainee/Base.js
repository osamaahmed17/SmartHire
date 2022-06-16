import React, { useState, useEffect } from 'react'
import Navigation from './Navigation';
import { getlocalstore } from '../auth/helper';
import { Link, Redirect } from 'react-router-dom';
import { TraineeLogout } from '../auth/traineehelper/TraineeIndex';
import './css/TraineeDashBoard.css';
import logo from '../image/logo.png';

const Base = ({
    children
}) => {

    const [name, setName] = useState([]);
    const [didredirect, setdidredirect] = useState(false);
    const getStudentDetailsFromLocal = () => {
        if (getlocalstore("trainee"))
            setName(getlocalstore("trainee"));
    }

    const redirect = () => {
        return (
            didredirect && (
                <Redirect to="/TraineeLogin" />
            )
        )
    }

    const logout = () => {
        StudentLogout();
        setdidredirect({
            didredirect: true
        })
    }
    useEffect(() => {
        getStudentDetailsFromLocal()
    }, []);

    const interviewexpbtn = () => {
        if (name.year_of_passing <= 2021) {
            return (
                <Link to="/InterviewExperience"><button to="/InterviewExperience" className="interviewexpbtn" type="button">Add Interview Experience</button></Link>
            )
        }
    }

    return (
        <div>
            <nav className="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white" id="sidenav-main">
                <div className="scrollbar-inner">
                    <div className="sidenav-header align-items-center mb-7">
                        <span className="navbar-brand">
                            <img src={logo} alt="Svvv logo" style={{ maxHeight: "98px" }} />
                            <h1>SmartHire</h1>
                        </span>
                    </div>
                    <hr />
                    <Navigation />
                </div>
            </nav>
            {redirect()}
            <div className="main-content" id="panel">
                <nav className="navbar navbar-top navbar-expand navbar-dark bg-main border-bottom">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav align-items-center ml-auto">
                                <li className="nav-item d-xl-none">
                                    <div className="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin" data-target="#sidenav-main">
                                        <div className="sidenav-toggler-inner">
                                            <i className="sidenav-toggler-line"></i>
                                            <i className="sidenav-toggler-line"></i>
                                            <i className="sidenav-toggler-line"></i>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul className="navbar-nav align-items-center ml-md-0 ">
                                <li className="nav-item dropdown">
                                    <button className="nav-link pr-0" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        <div className="media align-items-center">
                                            <div className="media-body ml-2 d-lg-block">
                                                <span className="mb-0 text-sm font-weight-bold">{name.name}</span>
                                            </div>
                                        </div>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right ">
                                        <div className="dropdown-header noti-title">
                                            <h6 className="text-overflow m-0">Welcome!</h6>
                                        </div>
                                        <Link to="/Profile">
                                            <button className="dropdown-item">
                                                <i className="ni ni-single-02"></i>
                                                <span>Profile</span>
                                            </button>
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <button className="dropdown-item" onClick={logout}>
                                            <i className="ni ni-user-run"></i>
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {interviewexpbtn()}
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Base;
