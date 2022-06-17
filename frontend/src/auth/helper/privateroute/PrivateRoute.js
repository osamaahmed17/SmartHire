import React from 'react'
import { isAuthenticated } from '../../traineehelper/TraineeIndex';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/TraineeLogin" />
                )
        } />
    )
}

export default PrivateRoute;