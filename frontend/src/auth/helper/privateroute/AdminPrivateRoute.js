import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isAdminAuthenticated } from '../index'

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props =>
            isAdminAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/Admin" />
                )
        } />
    )
}

export default AdminPrivateRoute;