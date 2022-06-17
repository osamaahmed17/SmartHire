import React from 'react'
import Base from '../Base';
import { Link } from 'react-router-dom';

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
                                <Link to="/WebDevelopment">


                                    <div className="mycard card-stats">


                                        <div className="card text-white bg-primary mb-3" style={{ "maxWidth": "50rem" }}>
                                            <div className="card-header">
                                                Program Guide
                                            </div>
                                            <div className="card-body">
                                                <h6 className="card-title">Human Resource Management</h6>
                                            </div>
                                        </div>
                                    </div>


                                </Link>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <Link to="/CompetitiveProgramming">
                                    <div className="mycard card-stats">


                                        <div className="card text-white bg-primary mb-3" style={{ "maxWidth": "50rem" }}>
                                            <div className="card-header">
                                                Program Guide
                                            </div>
                                            <div className="card-body">
                                                <h6 className="card-title">Manufacturing and Machineries</h6>
                                            </div>
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