import React, { useState, useEffect } from 'react'; 

import { Container } from './Styles'; 

const Nav = (): JSX.Element => { 

    return (
        <Container>
            <a href='/dashboard' style={{color: 'dodgerblue', textDecoration: 'none', cursor: 'pointer'}}>Home</a>
            <a href='/dashboard/export' style={{color: 'dodgerblue', textDecoration: 'none', cursor: 'pointer'}}>CRM Import/Export</a>
            <a href='/dashboard/links' style={{color: 'dodgerblue', textDecoration: 'none', cursor: 'pointer'}}>Career Links</a>
        </Container>
    ); 
}

export default Nav; 