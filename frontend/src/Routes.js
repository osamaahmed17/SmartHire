import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TraineeLogin from './home/TraineeLogin';
import PageNotFound from './PageNotFound';
import TraineeHome from './trainee//TraineeHome';

import Index from './mainApp/Index';


const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Index}></Route>
                    <Route path="/TraineeLogin" exact component={TraineeLogin}></Route>
                    <Route path="/TraineeHome" exact component={TraineeHome} />



                </Switch>
            </Router>

        </div>
    );
}

export default Routes;