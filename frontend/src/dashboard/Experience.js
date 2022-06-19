import React, { useState, useEffect } from 'react'
import Base from './Base'
import './css/nucleo.css'
import './css/argon.css'
import happyFace from '../image/smiling-face.png'
import sadFace from '../image/frown.png'
import mehFace from '../image/meh.png'
import { localStore, getlocalstore } from '../auth/helper'
import { GetInterviewExpDetails } from '../auth/traineehelper/TraineeIndex'


const Experience = () => {

    const [interviewExp, setInterviewExp] = useState([]);
    const [individualInterviewData, setindividualInterviewData] = useState([]);
    const [values, setValues] = useState({
        showmodel: false,
        didredirect: false,
    })
    const {  showmodel } = values;
    const getDetailsOfInterview = () => {
        if (getlocalstore("interviewepxerience").length !== 0) {
            setInterviewExp(getlocalstore("interviewepxerience"));
        }
    }

    const getDataFromDB = () => {
        setValues({ ...values});
        GetInterviewExpDetails().then(res => {

            if (res.data.success === true) {

                localStore("interviewepxerience", res.data, () => {
                    setInterviewExp(res.data.data);
                    setValues({ ...values });
                });
                window.location.reload(false);
            } else {
                alert('Server error data Not found, please contact to Admin');
            }
        }).catch(e => {
            console.log(e);
        })
    }

   

    const individualExperienceData = (val) => () => {
        setValues({ ...values, showmodel: true })
        interviewExp.data.forEach((data, index) => {
            if (data._id === val) {
                if(data.sentimentAnalysis > 0)
                {
                   data.sentimentAnalysis = happyFace
                }
                else if(data.sentimentAnalysis < 0)
                {
                    data.sentimentAnalysis = sadFace
                }
                else if(data.sentimentAnalysis === 0)
                {
                    data.sentimentAnalysis = mehFace

                }
              
                setindividualInterviewData(data);
               
            }
        })
    }

    const InterviewDetailsModel = () => {
        return (
            showmodel && (
                <div className="modal fade" id="departmentModel" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-4 p-2 col-12">
                                        <h4 className="static">Trainee Name</h4>
                                    </div>
                                    <div className="col-md-8 p-2 col-12">
                                        <h4 className="dynamic">{individualInterviewData.traineeName}</h4>
                                    </div>
                                    <div className="col-md-4 p-2 col-12">
                                        <h4 className="static">Department</h4>
                                    </div>
                                    <div className="col-md-8 p-2 col-12">
                                        <h4 className="dynamic">{individualInterviewData.departmentName}</h4>
                                    </div>
                                    <div className="col-md-4 p-2 col-12">
                                        <h4 className="static">Email</h4>
                                    </div>
                                    <div className="col-md-8 p-2 col-12">
                                        <h4 className="dynamic">{individualInterviewData.email}</h4>
                                    </div>
                                    <div className="col-md-4 p-2 col-12">
                                        <h4 className="static">Interview Date</h4>
                                    </div>
                                    <div className="col-md-8 p-2 col-12">
                                        <h4 className="dynamic">{individualInterviewData.interviewDate}</h4>
                                    </div>
                                    <div className="col-md-4 p-2 col-12">
                                        <h4 className="static">Internee Experience</h4>
                                    </div>
                                    <div className="col-md-8 p-2 col-12">
                                        <h4 className="dynamic">{individualInterviewData.experience}</h4>
                                    </div>
                                    <div className="col-md-4 p-2 col-12">
                                        <h4 className="static">Sentiment Analysis</h4>
                                    </div>
                                    <div className="col-md-8 p-2 col-12">
                                       <img style={{maxHeight:"35px"}} alt="sentimentAnalysis" src={individualInterviewData.sentimentAnalysis} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    }

    useEffect(() => {
        getDetailsOfInterview()
    }, [])
    return (
        <Base>
            <div className="header bg-main pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center pt-4">
                            <div className="col-lg-6 col-7">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item">Interview Experience</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-6 col-5 text-right">
                                <button className="btn btn-sm btn-neutral" onClick={getDataFromDB}>Refresh Data</button>
                            </div>
                        </div>
                        <div className="row">
                          
                            {interviewExp.data && interviewExp.data.map((data, index) => {
                              
                                    return (
                                        <button className="col-md-4 col-12 mt-3" data-toggle="modal" data-target="#departmentModel" key={index} onClick={individualExperienceData(data._id)}>
                                            <div className="mycard card-stats">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h4 className="card-title text-uppercase text-muted mb-0">{data.experienceID}</h4>
                                                            <span className="h2 font-weight-bold mb-0" style={{color:"black"}}>{data.traineeName}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    )
                                
                            })}
                        </div>
                        {InterviewDetailsModel()}
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default Experience;
