import React from 'react'
import Base from '../Base';
import { Link } from 'react-router-dom';

let cardStyle = {
   
    color:"white",

}
const ProgramGuide = () => {
    return (
        <Base>
            <div className="header bg-main pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center pt-4">
                            <div className="col-lg-6 col-7">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item">Program Guide</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-xl-4 col-md-6">
                                <Link to="/Manufacturing">
                                        <div className="card bg-success" style={{ "maxWidth": "30rem" }}>
                                            <div className="card-header" style={{ color: "black" }}>
                                            Program Guide
                                            </div>
                                            <div className="card-body">
                                            <div className="card-title"><h2 style={cardStyle}>Manufacturing</h2></div>
                                            </div>
                                        </div>
                                </Link>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <Link to="/HumanResourceManagement">
                                <div className="card bg-success" style={{ "maxWidth": "30rem" }}>
                                            <div className="card-header" style={{ color: "black" }}>
                                            Program Guide
                                            </div>
                                            <div className="card-body">
                                            <div className="card-title"><h2 style={cardStyle}>Human Resource Management</h2></div>
                                            </div>
                                        </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default ProgramGuide;