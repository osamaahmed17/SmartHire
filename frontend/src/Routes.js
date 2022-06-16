import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Index from './mainApp/Index';


const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Index}></Route>
                </Switch>
            </Router>

        </div>
    );
}

export default Routes;