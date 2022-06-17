import React, { useState, useEffect } from 'react'
import Navigation from './Navigation';
import { getlocalstore } from '../auth/helper';
import { Link, Redirect } from 'react-router-dom';
import { TraineeLogout } from '../auth/traineehelper/TraineeIndex';
import './css/TraineeDashBoard.css';

const Base = ({
    children
}) => {

    const [name, setName] = useState([]);
    const [didredirect, setdidredirect] = useState(false);
    const getTraineeDetailsFromLocal = () => {
        if (getlocalstore("trainee"))
            setName(getlocalstore("trainee"));
    }

    const redirect = () => {
        return (
            didredirect && (
                <Redirect to="/TraineeLogin" />
            )
        )
    }

    const logout = () => {
        TraineeLogout();
        setdidredirect({
            didredirect: true
        })
    }
    useEffect(() => {
        getTraineeDetailsFromLocal()
    }, []);

    const interviewexpbtn = () => {
       
            return (
                <Link to="/InterviewExperience"><button to="/InterviewExperience" className="interviewexpbtn" type="button">Add Interview Experience</button></Link>
            )
        
    }

    return (
        <div>
            <Navigation />
            {redirect()}
            <div className="main-content" id="panel">
               
                {interviewexpbtn()}
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Base;
