import React, { useState, useEffect } from 'react'
import Base from './Base'
import './css/nucleo.css'
import './css/argon.css'
import { getTraineeDetails, localStore, getlocalstore } from '../auth/helper'

const Trainee = () => {

    const [trainees, setTrainees] = useState([]);
    const getTraineeDetail = () => {
        getTraineeDetails()
            .then(res => {
                if (res.data.success === true) {
                    localStore("trainee", res.data, () => {
                        setTrainees(res.data);
                    });
                }
            });
    }
    const getTraineeDetailsFromLocal = () => {
        setTrainees(getlocalstore("trainee"));
    }

    useEffect(() => {
        getTraineeDetailsFromLocal();
    }, []);
    return (
        <Base>
            <div className="header bg-primary pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center py-4">
                            <div className="col-lg-6 col-7">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item">Trainee Details</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-6 col-5 text-right">
                                <button className="btn btn-sm btn-neutral" onClick={getTraineeDetail}>Refresh Data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt--6">
                <div className="card bg-default shadow">
                    <div className="card-header bg-transparent border-0">
                        <h3 className="text-white mb-0">Trainee Data</h3>
                    </div>
                    <div className="table-responsive">
                        <div className="table align-items-center table-dark table-hover">
                            <table>
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Trainee ID</th>
                                    <th>Department</th>
                                    <th>Contact Number</th>
                                </tr>
                            </thead>
                           
                            <tbody>
                            
                                {Array.isArray(trainees.data) &&
                                    trainees.data.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.name}</td>
                                                <td>{data.email}</td>
                                                <td>{data.traineeID}</td>
                                                <td>{data.department}</td>
                                                <td>{data.contactNumber}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default Trainee;
