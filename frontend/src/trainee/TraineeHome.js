import React, { useState, useEffect } from 'react'
import Base from './Base';

import { getlocalstore, get_department_details, localStore, getDepartmentFormDetails } from '../auth/helper';



const TraineeHome = () => {


    const [departmentData, setdepartmentData] = useState([]);

    const [individualData, setindividualData] = useState([]);
    const [departmentFormData, setDepartmentFormData] = useState([]);

    const [values, setvalues] = useState({
        Cform: false
    });
    const { Cform } = values;

    const getDetailsFromLocal = (val) => {
        if (getlocalstore(val).length !== 0) {
            if (val === "department_data") {
                setdepartmentData(getlocalstore(val));

            }
            else if (val === "departmentFormData") {
                setDepartmentFormData(getlocalstore(val));
            }
        } else {
            if (val === "department_data") {
                alert('fetch data from DB department');
                get_department_details().then(res => {
                    if (res.status === 200) {
                        localStore("department_data", res.data, () => {
                            setdepartmentData(res.data);
                        });
                    } else {
                        alert('Server error data not found, please contact to Admin');
                    }
                }).catch(e => {
                    console.log(e);
                })
            } else if (val === "departmentFormData") {
                alert('fetch data from DB department Form');
                getDepartmentFormDetails().then(res => {
                    if (res.status === 200) {
                        localStore("departmentFormData", res.data, () => {
                            setDepartmentFormData(res.data);
                        });
                    } else {
                        alert('Server error data Not found, please contact to Admin');
                    }
                }).catch(e => {
                    console.log(e);
                })
            }

        }
    }

    useEffect(() => {
        getDetailsFromLocal("department_data");
        getDetailsFromLocal("departmentFormData");
    }, []);

    const getIndividualDepartment = (val) => () => {
        setvalues({ ...values, Cform: true })
        departmentData.data.map((data, index) => {
            if (data._id === val) {
                setindividualData(data);
            }
        })
    }

    const Departmentregistrationform = (val) => {
        if (Cform === true) {
            var condi = false;
            var link_val = "";
            departmentFormData.data.map((data, i) => {


                if (data.department_name === val) {
                    condi = true;
                    link_val = data.department_google_link;
                }

            })
            if (condi === true) {
                return (
                    <a href={link_val} className="btn btn-success" target="blank">Registration form</a>
                )
            }
        }
    }
    const DepartmentModel = () => {
        return (
            
            <div className="modal fade" id="DepartmentModel" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6 p-3 col-12">
                                    <h2 className="static">Department Name</h2>
                                </div>
                                <div className="col-md-6 p-3 col-12">
                                    <h2 className="dynamic">{individualData.name}</h2>
                                </div>
                                <div className="col-md-6 p-3 col-12">
                                    <h2 className="static">Pre Placement Talk</h2>
                                </div>
                                <div className="col-md-6 p-3 col-12">
                                    <h2 className="dynamic">{individualData.placement}</h2>
                                </div>
                                <div className="col-md-6 p-3 col-12">
                                    <h2 className="static">Date of Test</h2>
                                </div>
                                <div className="col-md-6 p-3 col-12">
                                    <h2 className="dynamic">{individualData.date}</h2>
                                </div>
                               
                                <div className="col-md-6 p-3 col-12">
                                    <h2 className="static">Technical Department</h2>
                                </div>
                                <div className="col-md-6 p-3 col-12">
                                    <h2 className="dynamic">{individualData.field}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {Departmentregistrationform(individualData.name)}
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (

        <Base>
            <div className="header bg-main pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center pt-4">
                            <div className="col-lg-6 col-7">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item">Current Departments</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                 
                        <div className="row">

                          

                            {departmentData.data &&
                                departmentData.data.map((data, index) => {
                                    return (
                                        <button className="col-md-4 col-sm-6 mt-3" data-toggle="modal" data-target="#DepartmentModel" key={index} onClick={getIndividualDepartment(data._id)}>
                                            <div className="mycard card-stats">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                        <h4 className="card-title text-uppercase text-muted mb-0">{data.factory}</h4>
                                                        <span className="h4 font-weight-bold mb-0">{data.placement}</span>
                                                           
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    )
                                })}





                        </div>
                      
                    </div>
                    {DepartmentModel()}
                </div>
            </div>
        </Base>
    )
}

export default TraineeHome;