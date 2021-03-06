import React from 'react'; 
import { Router, Switch, Route, Redirect } from 'react-router-dom'; 

import Form from 'Form/index'; 
import Login from 'Login/index'; 
import Dashboard from 'Dashboard/index'; 
import Export from 'Dashboard/Export/index'; 
import View from 'Dashboard/View/index'; 
import Settings from 'Dashboard/Settings/index';
import JobPosting from 'Dashboard/JobPosting/index'; 

import history from 'browserHistory'; 

const Routes = (): JSX.Element => { 
    function PrivateRoute({component: Component, ...rest}: {component: any, path: string, exact: boolean}): JSX.Element { 

        let token: string = localStorage.getItem('token'); 
        let isAuthenticated: boolean = (token) ? true : false; 

        return ( 
            <Route
                {...rest} 
                render={props => 
                isAuthenticated ? (
                    <Component {...props} /> 
                ) : ( 
                    <Redirect
                        to={{
                            pathname: "/admin", 
                            state: {from: props.location}
                        }}
                    /> 
                )}
            /> 
        )
    }

    return ( 
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={Form} /> 
                <Route exact path='/login' component={Login} /> 
                <PrivateRoute path='/dashboard' component={Dashboard} exact/>
                <PrivateRoute path='/dashboard/export' component={Export} exact/> 
                <PrivateRoute path='/dashboard/view' component={View} exact /> 
                <PrivateRoute path='/dashboard/settings' component={Settings} exact /> 
                <PrivateRoute path='/dashboard/job-posting' component={JobPosting} exact /> 
            </Switch>
        </Router>
    )
}

export default Routes; 