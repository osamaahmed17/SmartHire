import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TraineeLogin from './home/TraineeLogin';
import dashboard from './dashboard/Dashboard'
import AdminPrivateRoute from './auth/helper/privateroute/AdminPrivateRoute';

import PageNotFound from './PageNotFound';
import TraineeHome from './trainee//TraineeHome';
import ProgramGuide from './trainee/programguide/ProgramGuide';
import PrivateRoute from './auth/helper/privateroute/PrivateRoute';
import EditProfile from './trainee/profile/EditProfile';
import Profile from './trainee/profile/Profile';
import AlumniIndex from './trainee/alumni/AlumniIndex';
import InterviewExp from './trainee/interviewexp/InterviewExp';
import Home from './home/Home';



import ChangePassword from './trainee/profile/ChangePassword';


import Index from './mainApp/Index';


const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Index}></Route>
                    <Route path="/Admin" exact component={Home}></Route>
                    <Route path="/TraineeLogin" exact component={TraineeLogin}></Route>
                    <PrivateRoute path="/TraineeHome" exact component={TraineeHome} />
                    <PrivateRoute path="/ProgramGuide" exact component={ProgramGuide} />
                    <PrivateRoute path="/Profile" exact component={Profile} />
                    <PrivateRoute path="/EditProfile" exact component={EditProfile} />
                    <PrivateRoute path="/ChangePassword" exact component={ChangePassword} />
                    <PrivateRoute path="/TraineeAlumni" exact component={AlumniIndex} />
                    <PrivateRoute path="/InterviewExperience" exact component={InterviewExp} />
                    <AdminPrivateRoute path="/dashboard" exact component={dashboard} />
                    <Route path="*" exact component={PageNotFound}></Route>

                </Switch>
            </Router>

        </div>
    );
}

export default Routes;