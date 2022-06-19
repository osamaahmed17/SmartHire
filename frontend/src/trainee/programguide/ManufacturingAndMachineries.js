import React from 'react'
import Base from '../Base'
import '../css/TraineeDashBoard.css';
import { Link } from 'react-router-dom';

export default function ManufacturingAndMachineries() {
    return (
        <Base>
        <div className="basic_webDev pb-6">
            <div className="container-fluid">
                <div className="row align-items-center pt-4">
                    <div className="col-md-12 col-6">
                        <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                            <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                <li className="breadcrumb-item"> <Link to="/ProgramGuide">Program Guide</Link> / Manufacturing And Machineries</li>
                            </ol>
                        </nav>
                    </div>
                </div>
          
            </div>
        </div>
    </Base>
    )
}
