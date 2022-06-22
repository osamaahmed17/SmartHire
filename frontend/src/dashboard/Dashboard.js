import React from 'react'
import Base from './Base';
import './css/nucleo.css'
import './css/argon.css'
const dashboard = () => {

    return (
        <Base>
            <div className="header bg-primary pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center py-4">
                            <div className="col-lg-6 col-7">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item">Admin Dashboard</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-4 col-md-6">
                                <div className="card card-stats">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h4 className="card-title text-uppercase text-muted mb-0">Total Departments</h4>
                                                <span className="h2 font-weight-bold mb-0">2</span>
                                            </div>
                                            <div className="col-auto">
                                                <div
                                                    className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                                    <i className="ni ni-active-40"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card card-stats">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h4 className="card-title text-uppercase text-muted mb-0">Total Trainee</h4>
                                                <span className="h2 font-weight-bold mb-0">1</span>
                                            </div>
                                            <div className="col-auto">
                                                <div
                                                    className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                                    <i className="ni ni-chart-pie-35"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <div className="card card-stats">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h4 className="card-title text-uppercase text-muted mb-0">Total Alumni</h4>
                                                <span className="h2 font-weight-bold mb-0">5</span>
                                            </div>
                                            <div className="col-auto">
                                                <div
                                                    className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                                                    <i className="ni ni-money-coins"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default dashboard;
