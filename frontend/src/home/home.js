/*****************************************
 * Import Require modules
 ******************************************/
 import React, { useState } from 'react'
 import { adminLogin, localStore } from '../auth/helper'
 import { Redirect } from 'react-router-dom'
 
 import '../css/main.css'
 import '../css/util.css'
 import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css'
 import '../fonts/iconic/css/material-design-iconic-font.min.css'
 
 /***************************************************************
  * Admin Login API
  ****************************************************************/
 const Home = () => {
 
     //Admin useState**************************
     const [values, setvalues] = useState({
         email: "",
         password: "",
         errmsg: "",
         error: false,
         loading: false,
         didRedirect: false,
     });
 
     const { email, password, error, loading, didRedirect } = values;
 
     /*****************************
      * ---------- Handle Function -------------------------
      ******************************/
     const handleChange = (val) => (event) => {
         setvalues({ ...values, error: false, [val]: event.target.value });
     }
 
     /*****************************
      * ---------- Loading Message -------------------------
      ******************************/
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
 
     /*******************************
      * ---------- Handle Function -------------------------
      *******************************/
     const errormsg = () => {
         return (
             error && (
                 <div className="row">
                     <div className="col-md-12 alert alert-danger">
                         <h5>{values.errmsg}</h5>
                     </div>
                 </div>
             )
         )
     }
 
     /*******************************
      * ---------- On Submit Function login main API call -------------------------
      ********************************/
     const onSubmit = (event) => {
         event.preventDefault();
         setvalues({ ...values, error: false, loading: true });
         adminLogin({ email, password })
             .then(data => {
                 console.log("Data", data);
                 console.log(data.data.success)
                 if (data.data.success === true) {
                   
                     localStore('admin', data.data, ()=>{
                         setvalues({
                             ...values,
                             didRedirect: true
                         })
                     })
                 } else {
                     setvalues({
                         ...values,
                         error: true,
                         errmsg: data.data.error,
                         email: '',
                         password: ''
                     })
                 }
             })
             .catch(e => {
                 console.log(e);
             })
     }
 
     /*******************************
      * ---------- Redirect Function -------------------------
      ********************************/
     const performRedirect = () => {
         return (
             didRedirect && (
                 <Redirect to="/dashboard" />
             )
         )
     }
     /*******************************
      * ---------- Login form JSX -------------------------
      ********************************/
     const loginForm = () => {
         return (
             <div>
                 <div className="limiter">
                     <div className="container-login100">
                         <div className="wrap-login100 p-l-55 p-r-55 p-t-45 p-b-45">
                             {loadingmsg()}
                             {errormsg()}
                             <form className="login100-form validate-form">
                                 <span className="login100-form-title p-b-30">
                                     Admin Login
                                 </span>
                                 <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                                     <span className="label-input100">Email</span>
                                     <input className="input100" type="email" name="username" placeholder="Enter your email" value={email} onChange={handleChange("email")} />
                                     <span className="focus-input100" data-symbol="&#xf206;"></span>
                                 </div>
                                 <div className="wrap-input100 validate-input" data-validate="Password is required">
                                     <span className="label-input100">Password</span>
                                     <input className="input100" type="password" name="pass" placeholder="Enter your password" value={password} onChange={handleChange("password")} />
                                     <span className="focus-input100" data-symbol="&#xf190;"></span>
                                 </div>
                                 <div className="container-login100-form-btn m-t-25">
                                     <div className="wrap-login100-form-btn">
                                         <div className="login100-form-bgbtn"></div>
                                         <button className="login100-form-btn" onClick={onSubmit}>
                                             Login
                                         </button>
                                     </div>
                                 </div>
                             </form>
                         </div>
                     </div>
                 </div>
             </div>
         )
     }
 
 
     /*********************************************
      * ---------- Admin Login return Statement -------------------------
      *********************************************/
     return (
         <div>
             {loginForm()}
             {performRedirect()}
         </div>
     )
 }
 //export Home module 
 export default Home;
 