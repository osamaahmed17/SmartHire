import React, { useState, useEffect } from 'react'
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import './css/TraineeDashBoard.css';

const Base = ({
    children
}) => {

    const interviewexpbtn = () => {
        return (
            <Link to="/InterviewExperience"><button to="/InterviewExperience" className="interviewexpbtn" type="button">Add Interview Experience</button></Link>
        )
    }

    return (
        <div>
            <Navigation />
            <div className="main-content" id="panel">
                {interviewexpbtn()}
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Base;
