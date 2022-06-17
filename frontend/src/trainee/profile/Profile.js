import React, { useState, useEffect } from 'react'
import Base from '../Base';

import profilebg from '../../image/profilebg.jpg';
import { getlocalstore } from '../../auth/helper';
import { Link } from 'react-router-dom';

const Profile = () => {

    const [userProfile, setUserProfile] = useState([]);

    const traineeInfo = {
        color: "black",
        fontSize: "19px",
        fontFamily: "Verdana",
        fontWeight: "normal"
    }

    const traineeLabel = {
        color: "black",
        fontFamily: "Verdana",
        fontWeight: "bold",
        fontSize: "20px",

    }
    const getUserProfileFromLocal = () => {
        if (getlocalstore("trainee"))
            setUserProfile(getlocalstore("trainee").data);
    }
    useEffect(() => {
        getUserProfileFromLocal()
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
                                        <li className="breadcrumb-item">Profile</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="container-fluid mt-1">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-6 ">
                                    <div className="card card-profile">
                                        <img src={profilebg} alt="Background Img" className="card-img-top" height="200px" />

                                        <div className="card-header text-center border-0">
                                            <div className="d-flex justify-content-between">
                                                <Link to="/EditProfile"><button className="btn btn-sm btn-primary mr-4">Edit Profile</button></Link>
                                                <Link to="/ChangePassword"><button className="btn btn-sm btn-default float-right">Change Password</button></Link>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row offset-md-3">
                                                <div className="col-md-5 card-userprofile">
                                                    <h4 style={traineeLabel}>Name</h4>
                                                </div>
                                                <div className="col-md-7 card-userprofile">
                                                    <p style={traineeInfo}>{userProfile.name}</p>
                                                </div>
                                                <div className="col-md-5 card-userprofile">
                                                    <h4 style={traineeLabel}>Email</h4>
                                                </div>
                                                <div className="col-md-7 card-userprofile">
                                                    <p style={traineeInfo}>{userProfile.email}</p>
                                                </div>
                                                <div className="col-md-5 card-userprofile">
                                                    <h4 style={traineeLabel}>Trainee ID</h4>
                                                </div>
                                                <div className="col-md-7 card-userprofile">
                                                    <p style={traineeInfo}>{userProfile.traineeID}</p>
                                                </div>
                                                <div className="col-md-5 card-userprofile">
                                                    <h4 style={traineeLabel}>Department</h4>
                                                </div>
                                                <div className="col-md-7 card-userprofile">
                                                    <p style={traineeInfo}>{userProfile.department}</p>
                                                </div>
                                                <div className="col-md-5 card-userprofile">
                                                    <h4 style={traineeLabel}>Contact Number</h4>
                                                </div>
                                                <div className="col-md-7 card-userprofile">
                                                    <p style={traineeInfo}>{userProfile.contactNumber}</p>
                                                </div>

                                            </div>
                                        </div>
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

export default Profile;