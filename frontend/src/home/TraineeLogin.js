import React, { useState } from 'react'
import { TraineeSignUp, TraineeSignIn, sendOTPOnmail, forgotpassword } from '../auth/traineehelper/TraineeIndex';
import '../css/main.css'
import '../css/util.css'
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../fonts/iconic/css/material-design-iconic-font.min.css'
import { Redirect } from 'react-router-dom';
import { localStore } from '../auth/helper';

const TraineeLogin = () => {

    
    //State for Trainee 
    const [Trainee, setTrainee] = useState({
        name: "",
        email: "",
        department: "",
        contactNumber: "",
        password: "",
        traineeID:"",
        Cpassword:"",
        condition: "login",
        success: false,
        error: false,
        loading: false,
        msg: "",
        emailverification: true,
        otpverification: false,
        registrationformdisplay: false,
        forgotpasswordstate: false,
        didredirect: false
    });

    const { name, email, department, contactNumber,traineeID, password, Cpassword, success, error, loading, condition, msg, emailverification, otpverification, registrationformdisplay, forgotpasswordstate, didredirect } = Trainee;

    /*******************************************************************************
    * ---------- Handle Function -------------------------
    *********************************************************************************/
     const handleChange = (val) => (event) => {
        setTrainee({ ...Trainee, error: false, success: false, loading: false, [val]: event.target.value });
    }
    const conditionchange = (event) => {
        event.preventDefault();
        setTrainee({ ...Trainee, condition: "signup" });
    }
    const conditionchange2 = (event) => {
        event.preventDefault();
        setTrainee({ ...Trainee, condition: "login", email: "", error: false, success: false, traineeID: "", password: "", registrationformdisplay: false, emailverification: true, forgotpasswordstate: false, otpverification: false });
    }
    const conditionchange3 = (event) => {
        event.preventDefault();
        setTrainee({ ...Trainee, condition: "forgotpassword" });
    }
    /** ----------------------------------
     * Message Functions
    -------------------------------------- */
    const successmsg = () => {
        return (
            success && (
                <div className="row">
                    <div className="col-md-12 alert alert-success">
                        <h5 className="text-white">
                            {Trainee.msg}
                        </h5>
                    </div>
                </div>
            )
        )
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
                            {Trainee.msg}
                        </h4>
                    </div>
                </div>
            )
        )
    }
    const redirecttohome = () => {
        return (
            didredirect && (
                <Redirect to="/TraineeHome" />
            )
        )
    }

    /**********************************************************************
     * OnSubmit Button
     **********************************************************************/
    const onSubmit = (event) => {
        event.preventDefault();
        if (condition === "login") {
            if (traineeID === "") {
                alert("please enter your Email address");
            } else if (password === "") {
                alert("please enter password");
            } else {
                setTrainee({ ...Trainee, loading: true });
                TraineeSignIn({ traineeID, password })
                    .then(data => {
                        if (data.status === true) {
                            localStore("Trainee", data.data, () => {
                                setTrainee({
                                    ...Trainee,
                                    didredirect: true,
                                })
                            })
                        } else {
                            setTrainee({
                                ...Trainee,
                                error: true,
                                msg: data.msg,
                                traineeID: "",
                                password: ""
                            })
                        }
                    })
            }

        } else if (condition === "signup") {

            if (traineeID === "") {
                alert("please enter Traine ID");
            }
            if (name === "") {
                alert("please enter Name");
            } else if (email === "") {
                alert("please enter Email");
            } else if (department === "") {
                alert("please select Department");
            } else if (!contactNumber) {
                alert("please enter Contact number");
            } else if (password === "") {
                alert("please enter password");
            } else if (Cpassword === "") {
                alert("please enter conform password");
            } else if (password !== Cpassword) {
                alert("password and conform password NOT match");
            } else {
                setTrainee({ ...Trainee, loading: true });
                TraineeSignUp({ name, email, department, contactNumber, password })
                    .then(data => {
                        if (data.status === true) {
                            setTrainee({
                                ...Trainee,
                                name: "",
                                email: "",
                                department: "",
                                contactNumber: "",
                                traineeID:"",
                                password: "",
                                Cpassword: "",
                                condition: "login",
                                success: true,
                                error: false,
                                msg: data.msg,
                                loading: false
                            })
                        } else if (data.status === false) {
                            setTrainee({
                                ...Trainee,
                                success: false,
                                error: true,
                                msg: data.msg,
                                traineeID: "",
                            })
                        }
                    })
            }
        } else if (condition === "forgotpassword") {
            if (password === "")
                alert("please enter password");
            else if (Cpassword === "")
                alert("please enter confirm password");
            else if (password !== Cpassword)
                alert("password Not match");
            else {
                setTrainee({ ...Trainee, loading: true })
                forgotpassword({ email, password })
                    .then(data => {
                        if (data.status === true) {
                            setTrainee({
                                ...Trainee,
                                msg: data.msg,
                                success: true,
                                loading: false,
                                error: false,
                                email: "",
                                password: "",
                                Cpassword: ""
                            })
                        } else if (data.status === false) {
                            setTrainee({
                                ...Trainee,
                                msg: data.msg,
                                error: true,
                                success: false,
                                loading: false
                            })
                        }
                    })
            }
        }
    }

    /***********************************************************************
     * Genterate OTP and check OTP is correct or not
    ************************************************************************ */
    const genterateOTP = (event) => {
        event.preventDefault();
        setTrainee({ ...Trainee, loading: true, emailverification: false })
        if (email === "") {
            alert("Please Enter Email");
            setTrainee({ ...Trainee, loading: false, emailverification: true })
        } else {
            console.log({ email, condition })
            sendOTPOnmail({ email, condition })
                .then(res => {
                    if (res) {
                        setTrainee({
                            ...Trainee,
                            emailverification: false,
                            otpverification: true,
                            loading: false,
                            msg:res.data.otp
                        })
                    }
                })
        }
    }
    /** *-------Check OTP of user and system Generated */
    const otpcheck = () => {
        console.log(traineeID)
        console.log(msg)
        if (traineeID === msg) {
            if (condition === 'signup') {
                setTrainee({
                    ...Trainee,
                    otpverification: false,
                    registrationformdisplay: true,
                    loading: false,
                    traineeID: "",
                    msg: ""
                })
            } else if (condition === 'forgotpassword') {
                setTrainee({
                    ...Trainee,
                    otpverification: false,
                    forgotpasswordstate: true,
                    loading: false
                })
            }
        } else {
            alert('OTP not match, please enter correct OTP');
        }
    }
    const forgotpass = () => {
        return (
            forgotpasswordstate && (
                <div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>Change your Password</h1>
                        </div>
                    </div>
                    <hr />
                    <div className="row m-t-20 m-b-30">
                        <div className="col-md-8 offset-md-2">
                            <div className="wrap-input100 validate-input m-b-15">
                                <span className="label-input100">Password<span class="asteriskField">*</span></span>
                                <input className="input100" type="password" placeholder="Please enter new password" value={password} onChange={handleChange("password")} />
                                <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row m-t-20 m-b-30">
                        <div className="col-md-8 offset-md-2">
                            <div className="wrap-input100 validate-input m-b-15">
                                <span className="label-input100">confirm Password<span class="asteriskField">*</span></span>
                                <input className="input100" type="password" placeholder="Please re-enter your password" value={Cpassword} onChange={handleChange("Cpassword")} />
                                <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    }

    /** ----------------------------------
     * Email and OTP forms
    -------------------------------------- */
    const emailForm = () => {
        return (
            emailverification && (
                <div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>Email Verification Steps</h1>
                        </div>
                    </div>
                    <hr />
                    <div className="row m-t-40 m-b-30">
                        <div className="col-md-8 offset-md-2">
                            <p> <u>Note<span class="asteriskField">*</span></u> Please Enter Department Provided Email Address For Sending Details</p>
                            <div className="wrap-input100 validate-input m-b-15">
                                <span className="label-input100">Email<span class="asteriskField">*</span></span>
                                <input className="input100" type="email" placeholder="Please Enter your Email" value={email} onChange={handleChange("email")} />
                                <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    }
    const otpForm = () => {
        return (
            otpverification && (
                <div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>Email Verification Steps</h1>
                        </div>
                    </div>
                    <hr />
                    <div className="row m-t-40 m-b-30">
                        <div className="col-md-8 offset-md-2">
                            <p> Please Enter OTP Sent On {email}</p>
                            <div className="wrap-input100 validate-input m-b-15">
                                <span className="label-input100">One Time Password (OTP)<span class="asteriskField">*</span></span>
                                <input className="input100" type="email" placeholder="Please enter OTP" value={traineeID} onChange={handleChange("traineeID")} />
                                <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    }

    const registrationForm = () => {
        return (
            registrationformdisplay && (
                <div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>Trainee Registration</h1>
                        </div>
                    </div>
                    <hr />
                    <div className="row m-t-15">
                        <div className="col-md-6">
                            <div className="wrap-input100 validate-input m-b-15">
                                <span className="label-input100">Full Name<span class="asteriskField">*</span></span>
                                <input className="input100" type="text" placeholder="Enter your Name" value={name} onChange={handleChange("name")} />
                                <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                            <div className="wrap-input100 validate-input m-b-15">
                                <span className="label-input100">Email<span class="asteriskField">*</span></span>
                                <input disabled className="input100" type="email" placeholder="Enter your Email" value={email} onChange={handleChange("email")} />
                                <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                            <div className="wrap-input100 validate-input m-b-15">
                                <span className="label-input100">Trainee ID<span class="asteriskField">*</span></span>
                                <input className="input100" type="text" placeholder="Enter your Trainee ID" value={traineeID} onChange={handleChange("traineeID")} />
                                <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                            <div className="wrap-input100 validate-input m-b-15">
                                <span className="label-input100">Department<span class="asteriskField">*</span></span>
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
                        <div className="col-md-6">
                            <div className="wrap-input100 validate-input m-b-15">
                                <span className="label-input100">Contact Number<span class="asteriskField">*</span></span>
                                <input className="input100" type="number" placeholder="Enter your Contact Number" value={contactNumber} onChange={handleChange("contactNumber")} />
                                <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                       
                            <div className="wrap-input100 validate-input m-b-15">
                                <span className="label-input100">Password<span class="asteriskField">*</span></span>
                                <input className="input100" type="password" placeholder="Enter Your Password" value={password} onChange={handleChange("password")} />
                                <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                            <div className="wrap-input100 validate-input m-b-15">
                                <span className="label-input100">Confirm Password<span class="asteriskField">*</span></span>
                                <input className="input100" type="password" placeholder="Enter Your Confirm Password" value={Cpassword} onChange={handleChange("Cpassword")} />
                                <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    }

    /** ----------------------------------
     * Footer Button of model 
    -------------------------------------- */
    const modalFooterButton = () => {
        if (emailverification === true) {
            return (
                <div class="modal-footer">
                    {successmsg()}
                    {errormsg()}
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={conditionchange2}>Close</button>
                    <button type="button" class="btn btn-primary" onClick={genterateOTP}>Get OTP</button>
                </div>
            )
        } else if (otpverification === true) {
            return (
                <div class="modal-footer">
                    {successmsg()}
                    {errormsg()}
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={conditionchange2}>Close</button>
                    <button type="button" class="btn btn-primary" onClick={otpcheck}>Submit</button>
                </div>
            )
        } else if (registrationformdisplay === true) {
            return (
                <div class="modal-footer">
                    {successmsg()}
                    {errormsg()}
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={conditionchange2}>Close</button>
                    <button type="button" class="btn btn-primary" onClick={onSubmit}>SignUp</button>
                </div>
            )
        } else if (forgotpasswordstate === true) {
            return (
                <div class="modal-footer">
                    {successmsg()}
                    {errormsg()}
                    {loadingmsg()}
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={conditionchange2}>Close</button>
                    <button type="button" class="btn btn-primary" onClick={onSubmit}>change password</button>
                </div>
            )
        }
    }

    /***************************************
     * Trainee Registration Model
    ****************************************/
    const TraineeRegistration = () => {
        return (
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            {emailForm()}
                            {loadingmsg()}
                            {otpForm()}
                            {registrationForm()}
                            {forgotpass()}
                        </div>
                        {modalFooterButton()}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-45 p-b-45">
                    <form className="login100-form validate-form">
                        {loadingmsg()}
                        {errormsg()}
                        <span className="login100-form-title p-b-30">
                            Trainee Login
        					</span>
                        <div className="wrap-input100 validate-input m-b-23">
                            <span className="label-input100">Email</span>
                            <input className="input100" type="text" placeholder="Enter your email" value={traineeID} onChange={handleChange("traineeID")} />
                            <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>
                        <div className="wrap-input100 validate-input m-b-20">
                            <span className="label-input100">Password</span>
                            <input className="input100" type="password" placeholder="Enter your password" value={password} onChange={handleChange("password")} />
                            <span className="focus-input100" data-symbol="&#xf190;"></span>
                        </div>
                        <div className="container-login100-form-btn p-t-10">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn" onClick={onSubmit}>
                                    Login
    							    </button>
                            </div>
                        </div>
                        <div className="flex-col-c p-t-20 text-center">
                            <p>
                               For New Trainee <button type="button" data-toggle="modal" data-target="#exampleModal" data-backdrop="static" data-keyboard="false" onClick={conditionchange}><u>SignUp</u></button>
                            </p>
                        </div>
                        <div className="flex-col-c p-t-10">
                            <p>
                                <button type="button" data-toggle="modal" data-target="#exampleModal" data-backdrop="static" data-keyboard="false" onClick={conditionchange3}><u>Forgot Password</u></button>
                            </p>
                        </div>
                    </form>
                    {TraineeRegistration()}
                    {redirecttohome()}
                </div>
            </div>
        </div>
    )
}

export default TraineeLogin;