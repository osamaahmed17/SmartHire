import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import pageNotFound from './PageNotFound';
import Index from './mainApp/Index';


const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Index}></Route>
                    <Route path="*" exact component={pageNotFound}></Route>
                </Switch>
            </Router>

        </div>
    );
}

export default Routes;