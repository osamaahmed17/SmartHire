import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const currenttab = (history, path) => {
    if (history.location.pathname === path) {
        return { background: "#edf1f4" }
    }
}

const Navigation = ({ history, path }) => {
    return (
        <div className="navbar-inner">
            <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/dashboard">
                            <div className="nav-link" style={currenttab(history, "/dashboard")}>
                                <i class='bx bxs-right-arrow-alt'></i>
                                <span className="nav-link-text">Dashboard</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/company">
                            <div className="nav-link" style={currenttab(history, "/company")}>
                                <i class='bx bxs-right-arrow-alt'></i>
                                <span className="nav-link-text">Company</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/student">
                            <div className="nav-link" style={currenttab(history, "/student")}>
                                <i class='bx bxs-right-arrow-alt'></i>
                                <span className="nav-link-text">Student</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/alumni">
                            <div className="nav-link" style={currenttab(history, "/alumni")}>
                                <i class='bx bxs-right-arrow-alt'></i>
                                <span className="nav-link-text">Alumni</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/companyform">
                            <div className="nav-link" style={currenttab(history, "/companyform")}>
                                <i class='bx bxs-right-arrow-alt'></i>
                                <span className="nav-link-text">Company Form</span>
                            </div>
                        </Link>
                    </li>
                </ul>
                <hr className="my-3" />
            </div>
        </div>
    )
}

export default withRouter(Navigation);
