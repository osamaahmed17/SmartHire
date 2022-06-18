import React, { useState, useEffect } from 'react'
import Base from './Base';

import { getlocalstore, getDepartmentDetails, localStore, getDepartmentFormDetails } from '../auth/helper';



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
                console.log('fetch data from DB department');
                getDepartmentDetails().then(res => {
                    if (res.status === 200) {
                        localStore("department_data", res.data, () => {
                            setdepartmentData(res.data);
                        });
                    } else {
                        console.log('Server error data not found, please contact to Admin');
                    }
                }).catch(e => {
                    console.log(e);
                })
            } else if (val === "departmentFormData") {
                console.log('fetch data from DB department Form');
                getDepartmentFormDetails().then(res => {
                    if (res.status === 200) {
                        localStore("departmentFormData", res.data, () => {
                            setDepartmentFormData(res.data);
                        });
                    } else {
                        console.log('Server error data Not found, please contact to Admin');
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
                                    <h5 className="static">Department Name</h5>
                                </div>
                                <div className="col-md-6 p-3 col-12">
                                    <p className="dynamic">{individualData.name}</p>
                                </div>
                                <div className="col-md-6 p-3 col-12">
                                    <h5 className="static"> Field</h5>
                                </div>
                                <div className="col-md-6 p-3 col-12">
                                    <p className="dynamic">{individualData.field}</p>
                                </div>
                                <div className="col-md-6 p-3 col-12">
                                    <h5 className="static">Position Link</h5>
                                </div>
                                <div className="col-md-6 p-3 col-12">
                                    <p className="dynamic">{individualData.placement}</p>
                                </div>
                                <div className="col-md-6 p-3 col-12">
                                    <h5 className="static">Position Expiry Date</h5>
                                </div>
                                <div className="col-md-6 p-3 col-12">
                                    <p className="dynamic">{individualData.date}</p>
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
                                        <li className="breadcrumb-item">Dashboard - Current Opportunities</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        <div className="row">



                            {departmentData.data &&
                                departmentData.data.map((data, index) => {
                                    return (

                                        <button className="col-md-4 col-sm-6 mt-3" data-toggle="modal" data-target="#DepartmentModel" key={index} onClick={getIndividualDepartment(data._id)}>

                                           
                                            <div className="card text-white bg-success" style={{"maxWidth": "30rem"}}>
                                            <div className="card-header" style={{color:"black"}}>
                                                
                                               <h5>{data.factory}</h5> 
                                            </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">{data.name}</h5>
                                                    <h6 className="card-text">{data.field}</h6>
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