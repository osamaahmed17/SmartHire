import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TraineeLogin from './home/TraineeLogin';
import Dashboard from './dashboard/Dashboard'
import Trainee from './dashboard/Trainee'
import Experience from './dashboard/Experience';
import AdminPrivateRoute from './auth/helper/privateroute/AdminPrivateRoute';
import Department from './dashboard/Department'
import PageNotFound from './PageNotFound';
import TraineeHome from './trainee//TraineeHome';
import ProgramGuide from './trainee/programguide/ProgramGuide';
import PrivateRoute from './auth/helper/privateroute/PrivateRoute';
import EditProfile from './trainee/profile/EditProfile';
import Profile from './trainee/profile/Profile';
import AlumniIndex from './trainee/alumni/AlumniIndex';
import InterviewExp from './trainee/interviewexp/InterviewExp';
import HumanResourceManagement from './trainee/programguide/HumanResourceManagemnt';
import ManufacturingAndMachineries from './trainee/programguide/ManufacturingAndMachineries';
import Home from './home/HomeScreen';
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
                    <PrivateRoute path="/HumanResourceManagement" exact component={HumanResourceManagement} />
                    <PrivateRoute path="/ManufacturingAndMachineries" exact component={ManufacturingAndMachineries} />
                    <AdminPrivateRoute path="/Dashboard" exact component={Dashboard} />
                    <AdminPrivateRoute path="/Department" exact component={Department} />
                    <AdminPrivateRoute path="/Trainee" exact component={Trainee} />
                    <AdminPrivateRoute path="/ExperienceOverview" exact component={Experience} />
                    <Route path="*" exact component={PageNotFound}></Route>

                </Switch>
            </Router>

        </div>
    );
}

export default Routes;