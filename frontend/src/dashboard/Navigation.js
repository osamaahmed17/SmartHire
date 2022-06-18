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
                            <div className="nav-link" style={currenttab(history, "/Dashboard")}>
                                <i class='bx bxs-right-arrow-alt'></i>
                                <span className="nav-link-text">Dashboard</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/department">
                            <div className="nav-link" style={currenttab(history, "/Department")}>
                                <i class='bx bxs-right-arrow-alt'></i>
                                <span className="nav-link-text">Department</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/trainee">
                            <div className="nav-link" style={currenttab(history, "/Trainee")}>
                                <i class='bx bxs-right-arrow-alt'></i>
                                <span className="nav-link-text">Trainee</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/experience">
                            <div className="nav-link" style={currenttab(history, "/Experience")}>
                                <i class='bx bxs-right-arrow-alt'></i>
                                <span className="nav-link-text">Experience Overview</span>
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
