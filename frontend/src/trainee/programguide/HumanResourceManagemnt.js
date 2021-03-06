import React from 'react'
import Base from '../Base'
import '../css/TraineeDashBoard.css';
import { Link } from 'react-router-dom';

export default function HumanResourceManagement() {
    return (
        <Base>
            <div className="basic_webDev pb-6">
                <div className="container-fluid">
                    <div className="row align-items-center pt-4">
                        <div className="col-md-12 col-6">
                            <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                                <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                    <li className="breadcrumb-item"> <Link to="/ProgramGuide">Program Guide</Link> / Human Resource Management</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="card">
                                    <iframe src="https://www.youtube.com/embed/A2HFusWQIeE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <div className="card-body">
                                        <h5 className="card-title">HR Basics: Human Resource Management</h5>
                                        <p className="card-text">HR Basics is a series of short courses, designed to highlight what you need to know about a particular human resource management topic. In today’s HR Basics, we define human resource management with a simple model.</p>
                                        <a href="https://www.youtube.com/embed/A2HFusWQIeE" className="btn btn-primary">Access</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                    <iframe src="https://www.youtube.com/embed/aPEUKLxxh_k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <div className="card-body">
                                        <h5 className="card-title">Human Resource Management (HRM) Explained - Everything you Need to Know</h5>
                                        <p className="card-text">Human Resource Management, or HRM, is critical for making businesses successful. In this video, we explain what HRM is and how it contributes to business success.</p>
                                        <a href="https://www.youtube.com/embed/aPEUKLxxh_k" className="btn btn-primary">Access</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                    <iframe src="https://www.youtube.com/embed/8ciAnHfIiFA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <div className="card-body">
                                        <h5 className="card-title">What is Human Resource Management?</h5>
                                        <p className="card-text">Human Resource Management is the formal systems designed to manage people in an organization. Human resource management is like a pinwheel, the management of people in an organization is at the center of eight functional areas of human resource work.</p>
                                        <a href="https://www.youtube.com/embed/8ciAnHfIiFA" className="btn btn-primary">Access</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                    <iframe src="https://www.youtube.com/embed/qWv570bxjdU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <div className="card-body">
                                        <h5 className="card-title">Introduction to Human Resource Management</h5>
                                        <p className="card-text">In this video we will give you Introduction to Human Resource Management and scope of Human Resource Management. We will discuss Scope of Human Resource Management in more details in our upcoming Videos. Please subscribe to our channel and press bell icon for latest videos.</p>
                                        <a href="https://www.youtube.com/embed/qWv570bxjdU" className="btn btn-primary">Access</a>
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


