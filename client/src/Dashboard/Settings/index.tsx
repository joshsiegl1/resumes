import React, { useState, useEffect } from 'react'; 
import { CAREERLINKS, DISCIPLINES, LOGINS, getClientHostname } from 'shared/constants/apiconstants'; 
import { Button } from '../../Login/Styles';

import Nav from '../Nav/index';  

import { Container } from './Styles'; 

const Settings = (): JSX.Element => { 

    let [careerLinks, setCareerLinks] = useState([]); 
    let [disciplines, setDisciplines] = useState([]); 
    let [logins, setLogins] = useState([]); 
    let [loading, setLoading ] = useState<boolean>(true); 

    useEffect(() => { 
        async function fetchCareerLinks(): Promise<void> {
            setLoading(true);  
            await fetch(CAREERLINKS)
            .then(response => response.json())
            .then(json => { 
                setCareerLinks(json); 
                setLoading(false); 
            })
        }
        async function fetchDisciplines(): Promise<void> { 
            setLoading(true); 
            await fetch(DISCIPLINES)
            .then(response => response.json())
            .then(json => { 
                setDisciplines(json); 
                setLoading(false); 
            })
        }
        async function fetchLogins(): Promise<void> { 
            setLoading(true); 
            await fetch(LOGINS)
            .then(response => response.json())
            .then(json => { 
                setLogins(json); 
                setLoading(false); 
            })
        }

        fetchCareerLinks(); 
        fetchDisciplines(); 
        fetchLogins(); 
    }, [])

    const createJobPosting = (): void => { 
        window.location.replace(getClientHostname() + 'dashboard/job-posting')
    }

    const getCareerImage = (careerLink: any): JSX.Element => { 
        switch (careerLink.sid)
        {
            case 1: 
                return (<div style={{borderBottom: '1px solid lightgray', padding: '10px', backgroundColor: 'white', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img style={{marginRight: '5px'}} src='https://thumbs.dreamstime.com/b/linkedin-logo-icon-popular-social-media-element-vector-illustrations-web-internet-white-166811981.jpg' width='25' height='25'></img>
                    <b>{careerLink.site}:</b>
                </div>
                <i>https://apply.ebscareers.com/?sid={careerLink.sid}</i>
            </div> 
                )
            case 2: 
                return (<div style={{borderBottom: '1px solid lightgray', padding: '10px', backgroundColor: 'white', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img style={{marginRight: '5px'}} src='https://doqqkdlppl6bl.cloudfront.net/assets/logos/us_mobile_logo-8ad95cdb7bf0fb83f41753c6fccf1b10616b87a34cc091560922c42725f30bfc.png' width='25' height='25'></img>
                    <b>{careerLink.site}:</b>
                </div>
                <i>https://apply.ebscareers.com/?sid={careerLink.sid}</i>
            </div>)
            case 3: 
                return (<div style={{borderBottom: '1px solid lightgray', padding: '10px', backgroundColor: 'white', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img style={{marginRight: '5px'}} src='https://securemedia.newjobs.com/global/img/jobr/monster-app-logo.png' width='25' height='25'></img>
                    <b>{careerLink.site}:</b>
                </div>
                <i>https://apply.ebscareers.com/?sid={careerLink.sid}</i>
            </div> )
            case 4: 
                 return ( 
                    <div style={{alignItems: 'center', borderBottom: '1px solid lightgray', padding: '10px', backgroundColor: 'white', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img style={{marginRight: '5px'}} src='https://i2.wp.com/iaccessibility.net/wp-content/uploads/2018/04/indeed-employer-logo.png?fit=300%2C300&ssl=1' width='25' height='25'></img>
                        <b>{careerLink.site}:</b>
                    </div>
                    <Button onClick={createJobPosting} style={{width: '200px'}}>Create Job Posting</Button>
                </div>
                 )
            case 5: 
                //https://d25hn4jiqx5f7l.cloudfront.net/companies/logos/thumb/glassdoor_1501177651.png?1501177651
                return (<div style={{borderBottom: '1px solid lightgray', padding: '10px', backgroundColor: 'white', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img style={{marginRight: '5px'}} src='https://d25hn4jiqx5f7l.cloudfront.net/companies/logos/thumb/glassdoor_1501177651.png?1501177651' width='25' height='25'></img>
                    <b>{careerLink.site}:</b>
                </div>
                <i>https://apply.ebscareers.com/?sid={careerLink.sid}</i>
            </div>)
            case 6: 
                //https://media.glassdoor.com/sqll/531004/ziprecruiter-squarelogo-1460147661554.png
                return (<div style={{borderBottom: '1px solid lightgray', padding: '10px', backgroundColor: 'white', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img style={{marginRight: '5px'}} src='https://media.glassdoor.com/sqll/531004/ziprecruiter-squarelogo-1460147661554.png' width='25' height='25'></img>
                    <b>{careerLink.site}:</b>
                </div>
                <i>https://apply.ebscareers.com/?sid={careerLink.sid}</i>
            </div>)
            case 7: 
                return (<div style={{borderBottom: '1px solid lightgray', padding: '10px', backgroundColor: 'white', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img style={{marginRight: '5px'}} src='https://image.flaticon.com/icons/png/512/124/124010.png' width='25' height='25'></img>
                        <b>{careerLink.site}:</b>
                    </div>
                    <i>https://apply.ebscareers.com/?sid={careerLink.sid}</i>
                </div>)
            case 8: 
            return (<div style={{borderBottom: '1px solid lightgray', padding: '10px', backgroundColor: 'white', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img style={{marginRight: '5px'}} src='https://colourlex.com/wp-content/uploads/2021/02/cadmium-red-painted-swatch-1080x675.jpg' width='25' height='25'></img>
                <b>{careerLink.site}:</b>
            </div>
            <i>https://apply.ebscareers.com/?sid={careerLink.sid}</i>
            </div>)
            case 9: 
                //https://i0.wp.com/speechisbeautiful.com/wp-content/uploads/2015/04/ASHA-logo.jpg
                return ( <div style={{borderBottom: '1px solid lightgray', padding: '10px', backgroundColor: 'white', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img style={{marginRight: '5px'}} src='https://i0.wp.com/speechisbeautiful.com/wp-content/uploads/2015/04/ASHA-logo.jpg' width='25' height='25'></img>
                    <b>{careerLink.site}:</b>
                </div>
                <i>https://apply.ebscareers.com/?sid={careerLink.sid}</i>
            </div>)
            case 10: 
                //https://pbs.twimg.com/profile_images/1249818273979478017/wR8xW72G_400x400.png
                return (<div style={{borderBottom: '1px solid lightgray', padding: '10px', backgroundColor: 'white', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img style={{marginRight: '5px'}} src='https://pbs.twimg.com/profile_images/1249818273979478017/wR8xW72G_400x400.png' width='25' height='25'></img>
                    <b>{careerLink.site}:</b>
                </div>
                <i>https://apply.ebscareers.com/?sid={careerLink.sid}</i>
            </div>)
        }

        return (<div style={{borderBottom: '1px solid lightgray', padding: '10px', backgroundColor: 'white', width: '500px', display: 'flex', justifyContent: 'space-between'}}>
            <b>{careerLink.site}:</b> <i>https://apply.ebscareers.com/?sid={careerLink.sid}</i>
        </div>)
    }

    const renderDiscpline = (d: any): JSX.Element => { 
        return (<div style={{borderBottom: '1px solid lightgray', padding: '10px', backgroundColor: 'white', width: '500px'}}>
            <b>{d.name}</b>
        </div>)
    }

    const renderLogin = (l: any): JSX.Element => { 
        return (<div style={{display: 'flex', borderBottom: '1px solid lightgray', padding: '10px', backgroundColor: 'white', width: '500px', justifyContent: 'space-between'}}>
            <b>{l.username}</b>
            {l.isAdmin && (
                <b style={{color: 'dodgerblue'}}>Admin</b>
            )}
        </div>)
    }

    const renderCareerLinks = (): JSX.Element => { 
        return (<div style={{marginTop: '150px', display: 'flex', flexDirection: 'column', height: '500px', overflow: 'auto', border: '1px solid lightgray'}}>
            {!loading && ( 
                careerLinks.map(cl => getCareerImage(cl))
            )}
            {loading && ( 
                <i style={{fontSize: '75px', marginTop: '150px'}} className="fa fa-refresh fa-spin"></i>
            )}
        </div>)
    }

    const renderDisciplines = (): JSX.Element => { 
        return (<div style={{marginTop: '150px', display: 'flex', flexDirection: 'column', marginLeft: '50px', height: '500px', overflow: 'auto', border: '1px solid lightgray'}}>
            {!loading && ( 
                disciplines.map(d => renderDiscpline(d))
            )}
        </div>)
    }

    const renderLogins = (): JSX.Element => { 
        return (<div style={{marginTop: '150px', display: 'flex', flexDirection: 'column', marginLeft: '50px', height: '500px', overflow: 'auto', border: '1px solid lightgray'}}>
            {!loading && ( 
                logins.map(login => renderLogin(login))
            )}
        </div>)
    }

    return (
        <Container>
            <Nav /> 
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {renderCareerLinks()}
                </div>
                <div >
                    {renderDisciplines()}
                </div>
                <div>
                    {renderLogins()}
                </div>
            </div>
        </Container>
    ); 
}

export default Settings; 