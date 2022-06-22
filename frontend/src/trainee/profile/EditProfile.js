import React, { useState, useEffect } from 'react'
import Base from '../Base';
import { getlocalstore, localStore } from '../../auth/helper';
import { updateProfile } from '../../auth/traineehelper/TraineeIndex';
import { Redirect } from 'react-router-dom';

const EditProfile = () => {

    const [editStudent, setEditStudent] = useState({
        name: "",
        email: "",
        traineeID: "",
        department: "",
        contactNumber: "",
        error: false,
        redirect: false,
        loading: false,
        msg: "",
    });

    const { name, email, traineeID, department, contactNumber, error, redirect, loading, msg } = editStudent;
    const handleChange = (val) => (event) => {
        setEditStudent({ ...editStudent, error: false, success: false, loading: false, [val]: event.target.value });
    }

    const getTraineeFromLocal = () => {
        if (getlocalstore("")) {
            setEditStudent({
                ...editStudent,
                name: getlocalstore("trainee").name,
                email: getlocalstore("trainee").email,
                traineeID: getlocalstore("trainee").traineeID,
                department: getlocalstore("trainee").department,
                contactNumber: getlocalstore("trainee").contactNumber,
            })
        }
    }

    const loadingmsg = () => {
        return (
            loading && (
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="text-success">Loading....<i className='bx bx-loader bx-spin' ></i></h5>
                    </div>
                </div>
            )
        )
    }
    const errormsg = () => {
        return (
            error && (
                <div className="row">
                    <div className="col-md-12 alert alert-danger">
                        <h4>
                            {msg}
                        </h4>
                    </div>
                </div>
            )
        )
    }
    const redirectToProfile = () => {
        return (
            redirect && (
                <Redirect to="/Profile"></Redirect>
            )
        )
    }

    const OnSubmit = () => {
        if (name === "") {
            alert('please enter name');
        } else if (traineeID === "") {
            alert('please enter Trainee ID');
        } else if (department === "") {
            alert('please enter Department');
        } else if (contactNumber === "") {
            alert('please enter valid mobile number');
        } else {
            setEditStudent({ ...editStudent, loading: true })
            updateProfile({ email, name, traineeID, department, contactNumber })
                .then(data => {
                    if (data.data.success === true) {
                        localStore("trainee", data.data, () => {
                            setEditStudent({ ...editStudent, loading: false, redirect: true })
                        })
                    } else {
                        setEditStudent({ ...editStudent, msg: data.data.error, error: true, loading: false })
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    useEffect(() => {
        getTraineeFromLocal()
    }, []);
    return (
        <Base>
            <div className="header bg-main pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center pt-4">
                            <div className="col-lg-6 col-7">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item">Edit Profile</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="container-fluid mt-1">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-6 offset-md-1">
                                    <div className="card p-5">
                                        {loadingmsg()}
                                        {errormsg()}
                                        {redirectToProfile()}
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="wrap-input100 validate-input m-b-15">
                                                    <span className="label-input100">Name<span className="asteriskField">*</span></span>
                                                    <input className="input100" type="text" placeholder="Please Enter New Name" value={name} onChange={handleChange("name")} />
                                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="wrap-input100 validate-input m-b-15">
                                                    <span className="label-input100">Email<span className="asteriskField">*</span></span>
                                                    <input className="input100" type="text" placeholder="Please Enter New Email" value={email} onChange={handleChange("email")} />
                                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="wrap-input100 validate-input m-b-15">
                                                    <span className="label-input100"> Trainee ID<span className="asteriskField">*</span></span>
                                                    <input className="input100" type="text" placeholder="Please Enter New Trainee ID" value={traineeID} onChange={handleChange("traineeID")} />
                                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="wrap-input100 validate-input m-b-15">
                                                    <span className="label-input100">Department<span className="asteriskField">*</span></span>
                                                    <select className="select_input100" value={department} onChange={handleChange("department")}>
                                                        <option disabled>***select option***</option>
                                                        <option>Human Resource</option>
                                                        <option>Information Technology</option>
                                                        <option>Manufacturing</option>
                                                        <option>Machineries</option>
                                                    </select>
                                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="wrap-input100 validate-input m-b-15">
                                                    <span className="label-input100">Contact Number<span className="asteriskField">*</span></span>
                                                    <input className="input100" type="text" placeholder="Please Enter New Contact Number" value={contactNumber} onChange={handleChange("contactNumber")} />
                                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                                </div>
                                            </div>

                                        </div>
                                        <button className="btn btn-md btn-primary mt-2" onClick={OnSubmit}>Submit</button>
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

export default EditProfile;