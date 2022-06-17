import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../image/logo.png';


const Navigation = () => {
    let naveLink = {
        color: "white",
        fontSize: "18px",
        fontFamily: "Verdana",
        fontWeight: "bold"
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
                        <Link to="/TraineHome"><div className="nav-link" style={naveLink}>
                            <span className="nav-link-text" >Dashboard</span>
                        </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ProgamGuide">
                            <div className="nav-link" style={naveLink}>
                                <span className="nav-link-text" >Program Guide</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/TraineeAlumni">
                            <div className="nav-link" style={naveLink}>
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
                                    <span className="mb-0 text-lg font-weight-bold">Osama</span>
                                </div>
                            </div>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right ">

                            <Link to="/Profile">
                                <button className="dropdown-item">
                                    <i className="ni ni-single-02"></i>
                                    <span>Profile</span>
                                </button>
                            </Link>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" >
                                <i className="ni ni-user-run"></i>
                                <span>Logout</span>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default withRouter(Navigation);
