
import React, { useState, useEffect } from 'react'
import { getlocalstore } from '../auth/helper';
import { Link, withRouter, Redirect } from 'react-router-dom'
import logo from '../image/logo.png';
import { TraineeLogout } from '../auth/traineehelper/TraineeIndex';



const Navigation = () => {
    const [didredirect, setdidredirect] = useState(false);
    const [name, setName] = useState([]);
    const getTraineeDetailsFromLocal = () => {
        if (getlocalstore("trainee"))
            setName(getlocalstore("trainee"));
    }
    useEffect(() => {
        getTraineeDetailsFromLocal()
    }, []);

    const navLink = {
        color: "white",
        fontSize: "19px",
        fontFamily: "Verdana",
        fontWeight: "normal"
    }

    const navButton = {
        color: " black",
        fontSize: "16px",
        fontFamily: "Verdana",
        fontWeight: "normal"
    }
    const profileLink = {
        color: "white",
        fontSize: "18px",
        fontFamily: "Verdana",
        fontWeight: "bold"
    }
    const logout = () => {
        TraineeLogout();
        setdidredirect({
            didredirect: true
        })
    }

    const redirect = () => {
        return (
            didredirect && (
                <Redirect to="/" />
            )
        )
    }
    let userProfile = () => {
       if(name.data)
       {
        return    (<h2 style={profileLink}>{name.data.name}</h2>  )

       }
       else
       {
        return    (<h2 style={profileLink}>User</h2>  )

       }
        
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <span className="navbar-brand">
                <img src={logo} alt=" logo" style={{ height: "50px" }} />
            </span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/TraineeHome"><div className="nav-link" style={navLink}>
                            <span className="nav-link-text" >Dashboard</span>
                        </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ProgramGuide">
                            <div className="nav-link" style={navLink}>
                                <span className="nav-link-text" > Guide</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/TraineeAlumni">
                            <div className="nav-link" style={navLink}>
                                <span className="nav-link-text" >Alumni</span>
                            </div>
                        </Link>
                    </li>
                </ul>

                <ul className="navbar-nav align-items-center ml-md-0 ">
                    <li className="nav-item dropdown">
                        <button className="nav-link pr-0" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            <div className="media align-items-center">
                                <div className="media-body ml-2 d-lg-block">
                                        {userProfile()}
                                  
                                </div>
                            </div>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right ">

                            <Link to="/Profile">
                                <button className="dropdown-item">
                                    <i className="ni ni-single-02"></i>
                                    <span style={navButton}>Profile</span>
                                </button>
                            </Link>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" onClick={logout}>
                                <i className="ni ni-user-run"></i>
                                <span style={navButton}>Logout</span>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            {redirect()}
        </nav>

    )
}

export default withRouter(Navigation);
