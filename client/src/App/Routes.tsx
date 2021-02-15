import React from 'react'; 
import { Router, Switch, Route, Redirect } from 'react-router-dom'; 

import Form from 'Form/index'; 
import Admin from 'Admin/index'; 
import Login from 'Login/index'; 
import Dashboard from 'Dashboard/index'; 
import Export from 'Dashboard/Export/index'; 
import View from 'Dashboard/View/index'; 
import Links from 'Dashboard/Links/index';

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
                <Route exact path='/admin' component={Admin} /> 
                <Route exact path='/login' component={Login} /> 
                <PrivateRoute path='/dashboard' component={Dashboard} exact/>
                <PrivateRoute path='/dashboard/export' component={Export} exact/> 
                <PrivateRoute path='/dashboard/view' component={View} exact /> 
                <PrivateRoute path='/dashboard/links' component={Links} exact /> 
            </Switch>
        </Router>
    )
}

export default Routes; 