import React from 'react'; 

import { Container } from './Styles'; 

const Header = (): JSX.Element => { 
    return ( 
        <Container>
            <img style={{marginLeft: '30px'}} alt="Image" src="https://ebssecureforms.com/wp-content/uploads/2020/03/EbsHealthcareLogoWebTransparent_200.png" width="100" height="56" />
            <a href="/login" style={{marginRight: '60px', color: 'dodgerblue', textDecoration: 'none', cursor: 'pointer'}}>Admin</a>
        </Container>
    )
}

export default Header; 