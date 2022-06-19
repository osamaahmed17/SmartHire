/** *************************
 * Import Files
***************************** */
import React, { useState, useEffect } from 'react'
import Base from './Base'
import { addDepartmentDetails, getDepartmentDetails, localStore, deleteDepartmentDetail, getlocalstore } from '../auth/helper/index'

import './css/nucleo.css'
import './css/argon.css'

const Department = () => {

    /*----------------------------------------------
     * variable init
    ------------------------------------------------ */
    const [values, setvalues] = useState({
        name: "",
        placement: null,
        factory: null,
        field: null,
        date: null,
        errmsg: "",
        error: false,
        loading: false,
        sucess: false
    });
    const [departmentData, setDepartmentData] = useState([]);

    const { name, placement, factory, field, date, error, loading, sucess, errmsg } = values;

    /*  ---------------Handler function ------------------*/
    const handleChange = (val) => (event) => {
        setvalues({ ...values, error: false, sucess: false, loading: false, [val]: event.target.value })
    }
    const handleChange2 = () => {
        setvalues({ ...values, error: false, sucess: false, loading: false })
    }

    /** ----------------------------------
     * Success Message Function
    -------------------------------------- */
    const successmsg = () => {
        return (
            sucess && (
                <div className="row">
                    <div className="col-md-12 alert alert-success">
                        <h4 className="text-white">Data Added Successfully...</h4>
                    </div>
                </div>
            )
        )
    }

    /** ----------------------------------
     * Loading Message Function
    -------------------------------------- */
    const loadingmsg = () => {
        return (
            loading && (
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="text-success">Loading....</h5>
                    </div>
                </div>
            )
        )
    }

    /** ----------------------------------
     * Error Message Function
    -------------------------------------- */
    const errormsg = () => {
        return (
            error && (
                <div className="row">
                    <div className="col-md-12 alert alert-danger">
                        <h5>{errmsg}</h5>
                    </div>
                </div>
            )
        )
    }

    /** ----------------------------------
     * Form Submit Function
    -------------------------------------- */
    const onSubmit = (event) => {
        event.preventDefault();
        setvalues({ ...values, error: false, loading: true });

        // *****check all values****
        if (field === "") {
            alert("Please Enter Field");
        }
        else if (factory === "") {
            alert("Please Enter Factory");
        }
        else if (name === "") {
            alert("Please Enter name");
        } else if (placement == null && date == null) {
            alert("Please Enter Placement");

        } else {

            /**********************************
             * Make API call
             **********************************/
            addDepartmentDetails({ name, placement, factory, field, date })
                .then(data => {
                    console.log("DATA", data);
                    if (data.data.success === true) {
                        setvalues({
                            ...values,
                            name: "",
                            date: "",
                          
                            sucess: true,
                        })
                    } else {
                        setvalues({
                            ...values,
                            name: "",
                            placement: "",
                            date: "",
                          
                            errmsg: data.data.error,
                            error: true,
                        });
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    /** ----------------------------------
     * Get Department Data API call
    -------------------------------------- */
    const getdata = () => {
        getDepartmentDetails().then(res => {
            console.log("Department DATA", res);
            if (res.data.success === true) {
                localStore("departmentdata", res.data.data, () => {
                    setDepartmentData(res.data.data);
                });
            } else {
                alert('error in fetch Data');
            }
        }).catch(e => {
            console.log(e);
        })
    }

    const getDepartmentDetailsFromLocal = () => {
        setDepartmentData(getlocalstore("departmentdata"));
    }

    useEffect(() => {
        getDepartmentDetailsFromLocal();
    }, []);
    /** ----------------------------------
     * Department Details Form
    -------------------------------------- */
    const company_form = () => {
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Department Name<span className="asteriskField">*</span></label>
                        <input type="email" className="form-control" placeholder="Enter Department Name" value={name} onChange={handleChange("name")} />
                    </div>
                    <div className="form-group">
                        <label>Factory Name<span className="asteriskField">*</span></label>
                        <input type="text" className="form-control" placeholder="Enter Factory Name" value={factory} onChange={handleChange("factory")} />
                    </div>
                    <div className="form-group">
                        <label>Placement Link<span className="asteriskField">*</span></label>
                        <input type="text" className="form-control" placeholder="Enter Placement Link" value={placement} onChange={handleChange("placement")} />
                    </div>
                    <div className="form-group">
                        <label>Field Area<span className="asteriskField">*</span></label>
                        <input type="text" className="form-control"  placeholder="Enter Field Area" value={field} onChange={handleChange("field")} />
                    </div>
                    
                </div>
            </div>
        )
    }
    /** ----------------------------------
     * Department Table Data
    -------------------------------------- */
    const department_data = () => {
        return (
            <div className="container-fluid mt--6">
                <div className="row">
                    <div className="col">
                        <div className="card bg-default shadow">
                            <div className="card-header bg-transparent border-0">
                                <h3 className="text-white mb-0">Department Details</h3>
                            </div>
                            <div className="table-responsive">
                                <div className="table align-items-center table-dark table-hover">
                                <table>

                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Department</th>
                                            <th>Factory</th>
                                            <th>Field</th>
                                            <th>Placement Link</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                        {departmentData.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{data.name}</td>
                                                    <td>{data.factory}</td>
                                                    <td>{data.field}</td>
                                                    <td>{data.placement}</td>


                                                    <td><button className="btn btn-danger btn-sm" onClick={deleteDepartmentDetail(data._id, () => { getdata() })}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <Base>
            <div className="header bg-primary pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center py-4">
                            <div className="col-lg-6 col-7">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item">Department Details</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-6 col-5 text-right">
                                <button className="btn btn-sm btn-neutral" data-toggle="modal" data-target="#exampleModal">Add Details</button>
                                <button className="btn btn-sm btn-neutral" onClick={getdata}>Refresh Data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Add Department Details</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <hr />
                        <div className="modal-body">
                            {company_form()}
                        </div>
                        <hr />
                        <div className="modal-footer">
                            {successmsg()}
                            {loadingmsg()}
                            {errormsg()}
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleChange2}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={onSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {department_data()}
        </Base>
    )
}

export default Department;
