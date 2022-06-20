import React, { useState, useEffect } from 'react'
import Base from '../Base';
import { getlocalstore } from '../../auth/helper';
import { AddInterviewExp } from '../../auth/traineehelper/TraineeIndex';

const InterviewExp = () => {

    const [interviewDetails, setInterviewDetails] = useState({
        email: "",
        traineeName: "",
        departmentName: "",
        interviewDate: "",
        experience: "",
        loading: false,
        success: false,
        error: false,
        msg: ""
    });

    const { email, traineeName, departmentName, interviewDate, experience, loading, success, error, msg } = interviewDetails;

    const handleChange = (val) => (event) => {
        setInterviewDetails({ ...interviewDetails, error: false, success: false, loading: false, [val]: event.target.value })
    }
    const getDataFromLocalStore = () => {
        setInterviewDetails({
            ...interviewDetails,
            email: getlocalstore('trainee').data.email,
            traineeName: getlocalstore('trainee').data.name

        })
    }

    const successmsg = () => {
        return (
            success && (
                <div className="row mt-2 ml-1">
                    <div className="col-md-10 alert alert-success">
                        <h4>
                            {msg}
                        </h4>
                    </div>
                </div>
            )
        )
    }

    const loadingmsg = () => {
        return (
            loading && (
                <div className="row m-2 mt-2 ml-1">
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
                <div className="row mt-2 ml-1">
                    <div className="col-md-10 alert alert-danger">
                        <h4>
                            {msg}
                        </h4>
                    </div>
                </div>
            )
        )
    }

    const OnSubmit = (event) => {
        event.preventDefault();
        if (email === "") {
            alert('server Error Please try later....!');
        
        } else if (departmentName === "") {
            alert('Department Name field cannot be empty');
        } else if (interviewDate === "") {
            alert('Please select Date');
        } else if (experience === "") {
            alert('Please type your interview experience');
        } else {
            setInterviewDetails({ ...interviewDetails, loading: true })
            AddInterviewExp({ email, traineeName, departmentName, interviewDate, experience })
                .then(res => {
                    if (res.data.success === true) {
                        setInterviewDetails({
                            ...interviewDetails,
                            loading: false,
                            msg: "Experience Added",
                            success: true,
                            traineeName: "",
                            departmentName: "",
                            interviewDate: "",
                            experience: ""
                        })
                    } else {
                        setInterviewDetails({
                            ...interviewDetails,
                            loading: false,
                            msg:"Error, Contact Support",
                            error: true,
                            traineeName: "",
                            departmentName: "",
                            Stpackage: "",
                            interviewDate: "",
                            experience: ""
                        })
                    }
                })
        }
    }

    useEffect(() => {
        getDataFromLocalStore()
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
                                        <li className="breadcrumb-item">Experience Overview</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="container-fluid mt-1">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-6 offset-md-1">
                                    <div className="card p-5">
                                        <div className="row r">
                                         
                                            <div className="col-md-12">
                                                <div className="wrap-input100 validate-input m-b-15">
                                                    <span className="label-input100">Department Name<span className="asteriskField">*</span></span>
                                                    <input className="input100" type="text" placeholder="Please Enter Department Name" value={departmentName} onChange={handleChange("departmentName")} />
                                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="wrap-input100 validate-input m-b-15">
                                                    <span className="label-input100">Date of Interview<span className="asteriskField">*</span></span>
                                                    <input className="input100" type="date" value={interviewDate} onChange={handleChange("interviewDate")} />
                                                    <span className="focus-input100" data-symbol="&#xf206;"></span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="wrap-input100 validate-input m-b-15">
                                                    <span className="label-input100">Trainee experience<span className="asteriskField">*</span></span>
                                                    <textarea className="form-control" rows="10" placeholder="Write Your Experience" value={experience} onChange={handleChange("experience")} />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-md btn-primary mt-2" onClick={OnSubmit}>Submit</button>
                                        {loadingmsg()}
                                        {errormsg()}
                                        {successmsg()}
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

export default InterviewExp;