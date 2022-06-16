import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import pageNotFound from './pageNotFound';

import Home from './home/home';
import Index from './mainApp/Index';


const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Index}></Route>
                    <Route path="/Admin" exact component={Home}></Route>
                   

                    <Route path="*" exact component={pageNotFound}></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default Routes;