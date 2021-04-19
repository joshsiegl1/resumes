import React, { useState, useEffect } from 'react'; 
import { CAREERLINKS, getClientHostname } from 'shared/constants/apiconstants'; 
import { Button } from '../../Login/Styles';

import Nav from '../Nav/index';  

import { Container } from './Styles'; 

const Links = (): JSX.Element => { 

    let [careerLinks, setCareerLinks] = useState([]); 

    useEffect(() => { 
        async function fetchCareerLinks(): Promise<void> { 
            await fetch(CAREERLINKS)
            .then(response => response.json())
            .then(json => { 
                setCareerLinks(json); 
            })
        }

        fetchCareerLinks(); 
    }, [])

    const createJobPosting = (): void => { 
        window.location.replace(getClientHostname() + 'dashboard/job-posting')
    }

    const renderCareerLinks = (): JSX.Element => { 

        let links: JSX.Element[] = []; 

        for (let i = 0; i < careerLinks.length; i++) {
            //indeed needs special job postings 
            if (careerLinks[i].sid !== 4)
            { 
                links.push(
                    <div style={{border: '1px solid lightgray', padding: '10px', margin: '5px', backgroundColor: 'white', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
                        <b style={{color: 'dodgerblue'}}>{careerLinks[i].site}:</b> <i>https://apply.ebscareers.com/?sid={careerLinks[i].sid}</i>
                    </div>
                )
            }
            else { 
                links.push(
                    <div style={{alignItems: 'center', border: '1px solid lightgray', padding: '10px', margin: '5px', backgroundColor: 'white', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
                        <b style={{color: 'dodgerblue'}}>{careerLinks[i].site}:</b> <Button onClick={createJobPosting} style={{width: '200px'}}>Create Job Posting</Button>
                    </div>
                )
            }
        }

        return (<div style={{marginTop: '50px', display: 'flex', flexDirection: 'column'}}>
            {links}
        </div>)
    }

    return (
        <Container>
            <Nav /> 
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {renderCareerLinks()}
            </div>
        </Container>
    ); 
}

export default Links; 