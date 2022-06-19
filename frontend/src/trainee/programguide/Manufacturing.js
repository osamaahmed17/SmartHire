import React from 'react'
import Base from '../Base'
import '../css/TraineeDashBoard.css';
import { Link } from 'react-router-dom';

export default function Manufacturing() {
    return (
        <Base>
            <div className="basic_webDev pb-6">
                <div className="container-fluid">
                    <div className="row align-items-center pt-4">
                        <div className="col-md-12 col-6">
                            <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                                <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                    <li className="breadcrumb-item"> <Link to="/ProgramGuide">Program Guide</Link> / Manufacturing</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="card">
                                <iframe src="https://www.youtube.com/embed/9XkX6EGk_CA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <div className="card-body">
                                        <h5 className="card-title">Inside Apple's iPhone Factory In China</h5>
                                        <p className="card-text">Last month it emerged that Apple, the most valuable company in the world and supposedly an icon of squeaky-clean progressive values, brushed aside allegations of labour within its key Chinese supply chain.</p>
                                        <a href="https://www.youtube.com/embed/A2HFusWQIeE" className="btn btn-primary">Access</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                <iframe src="https://www.youtube.com/embed/kC2SEiGaqoA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>                                    <div className="card-body">
                                        <h5 className="card-title">Control of Manufacturing Processes</h5>
                                        <p className="card-text">Introduction for processes and variation framework by MIT</p>
                                        <a href="https://www.youtube.com/embed/kC2SEiGaqoA" className="btn btn-primary">Access</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                <iframe src="https://www.youtube.com/embed/iyOh3GUPCd4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <div className="card-body">
                                        <h5 className="card-title">Smart Manufacturing - lessons from the industry.</h5>
                                        <p className="card-text">Consumers are changing manufacturing forever. Here are four things successful smart manufacturers know, and three they don't.</p>
                                        <a href="ttps://www.youtube.com/embed/iyOh3GUPCd4" className="btn btn-primary">Access</a>
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
