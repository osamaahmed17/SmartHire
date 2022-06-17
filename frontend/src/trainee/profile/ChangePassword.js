import React, { useState } from 'react'
import Base from '../Base';
import { getlocalstore } from '../../auth/helper';
import { forgotpassword } from '../../auth/traineehelper/TraineeIndex';
import { Redirect } from 'react-router-dom';

const ChangePassword = () => {
    const [Data, setData] = useState({
        password: "",
        Cpassword: "",
        loading: false,
        success: false,
        error: false,
        msg: "",
        redirect: false,
    });

    const { password, Cpassword, loading, error, msg, success,redirect } = Data;

    const handleChange = (val) => (event) => {
        setData({ ...Data, error: false, success: false, loading: false, [val]: event.target.value });
    }
    const loadingmsg = () => {
        return (
            loading && (
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="text-success">Loading....<i class='bx bx-loader bx-spin' ></i></h5>
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
    const successmsg = () => {
        return (
            success && (
                <div className="row">
                    <div className="col-md-12 alert alert-success">
                        <h5 className="text-white">
                            {msg}
                        </h5>
                    </div>
                </div>
            )
        )
    }

    const OnSubmit = () => {
        if (password === "")
            alert("Please Enter Password");
        else if (Cpassword === "")
            alert("Please Enter Confirm Password");
        else if (password !== Cpassword){
            alert("Password Not Match");
            setData({
                ...Data,
                password: "",
                Cpassword: ""
            })
        }
        else {
            if (getlocalstore("trainee")) {
                var email = getlocalstore("trainee").data.email;
                setData({ ...Data, loading: true })
                forgotpassword({ email, password })
                    .then(data => {
                        console.log(data);
                        if (data.data.success === true) {
                            setData({
                                ...Data,
                                msg: data.data.data,
                                success: true,
                                loading: false,
                                error: false,
                                email: "",
                                password: "",
                                Cpassword: "",
                                redirect:true
                            })
                        } else if (data.data.success === false) {
                            setData({
                                ...Data,
                                msg: data.data.error,
                                error: true,
                                success: false,
                                loading: false,
                                redirect:false
                            })
                        }
                    })
            }
        }
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
                                        <li className="breadcrumb-item">Change Password</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="container-fluid mt-1">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-4 offset-md-2">
                                    <div className="card p-4">
                                        {loadingmsg()}
                                        {successmsg()}
                                        {errormsg()}
                                        {redirectToProfile()}
                                        <div className="wrap-input100 validate-input m-b-15">
                                            <span className="label-input100">New Password<span class="asteriskField">*</span></span>
                                            <input className="input100" type="password" placeholder="Please Enter New Password" value={password} onChange={handleChange("password")} />
                                            <span className="focus-input100" data-symbol="&#xf190;"></span>
                                        </div>
                                        <div className="wrap-input100 validate-input m-b-15">
                                            <span className="label-input100">Conform Password<span class="asteriskField">*</span></span>
                                            <input className="input100" type="password" placeholder="Please Enter Conform Password" value={Cpassword} onChange={handleChange("Cpassword")} />
                                            <span className="focus-input100" data-symbol="&#xf190;"></span>
                                        </div>
                                        <button className="btn btn-md btn-primary mt-2" onClick={OnSubmit}>Change Password</button>
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

export default ChangePassword;