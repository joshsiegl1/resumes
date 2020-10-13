import React, { Fragment } from 'react'; 

import Header from 'shared/components/Header'; 

import Routes from './Routes'; 

const App = (): JSX.Element => { 
    return (<Fragment>
        <Header /> 
        <Routes /> 
    </Fragment>)
}

export default App; 