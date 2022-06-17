import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TraineeLogin from './home/TraineeLogin';
import PageNotFound from './PageNotFound';
import TraineeHome from './trainee//TraineeHome';
import ProgramGuide from './trainee/programguide/ProgramGuide';
import PrivateRoute from './auth/helper/privateroute/PrivateRoute';

import Index from './mainApp/Index';


const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Index}></Route>
                    <Route path="/TraineeLogin" exact component={TraineeLogin}></Route>
                    <PrivateRoute path="/TraineeHome" exact component={TraineeHome} />
                    <PrivateRoute path="/ProgramGuide" exact component={ProgramGuide} />
                    {/* <PrivateRoute path="/TraineeAlumni" exact component={AlumniIndex} />
                    <PrivateRoute path="/Profile" exact component={Profile} />
                    <PrivateRoute path="/ChangePassword" exact component={ChangePassword} />
                    <PrivateRoute path="/EditProfile" exact component={EditProfile} /> */}
                    <Route path="*" exact component={PageNotFound}></Route>




                </Switch>
            </Router>

        </div>
    );
}

export default Routes;