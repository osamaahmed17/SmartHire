import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const currenttab = (history, path) => {
    if (history.location.pathname === path) {
        return { background: "rgb(40, 116, 240, 0.2)", "borderRadius": "30px" }

    }
}

const Navigation = ({ history, path }) => {
    return (
        <div className="navbar-inner">
            <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/StudentHome"><div className="nav-link" style={currenttab(history, "/TraineeHome")}>
                            <i className='bx bxs-right-arrow-alt'></i>
                            <span className="nav-link-text">Dashboard</span>
                        </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ProgamGuide">
                            <div className="nav-link" style={currenttab(history, "/ProgamGuide")}>
                                <i className='bx bxs-right-arrow-alt'></i>
                                <span className="nav-link-text">Program Guide</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/TraineeAlumni">
                            <div className="nav-link" style={currenttab(history, "/TraineeAlumni")}>
                                <i className='bx bxs-right-arrow-alt'></i>
                                <span className="nav-link-text">Alumni</span>
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
