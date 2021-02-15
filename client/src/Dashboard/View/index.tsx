import React, { useState, useEffect } from 'react'; 
import { connect } from 'react-redux'; 

import Nav from '../Nav';  

import moment from 'moment'; 

import { Container, ApplicantContainer, ApplicantView } from './Styles'; 

import { Application } from 'shared/constants/interfaces'; 

const View = ({applications, ViewId, dispatch}: {applications: Application[], ViewId: number, dispatch: any}): JSX.Element => { 

    let [ application, setApplication ] = useState<Application>(null); 

    useEffect(() => { 
        for (let i = 0; i < applications.length; i++) { 
            if (applications[i].id === ViewId) { 
                setApplication(applications[i]); 
                break; 
            }
        }

    }); 

    const renderApplication = (): JSX.Element => { 
        if (application === null) { 
            return (<div></div>); 
        }
        
        let applicationLink = 'https://ebsjobapps.blob.core.windows.net/resumes/' + application.resume; 

        return ( 
            <div>
                <ApplicantView>
                    <hr style={{width: '100%', border: 'none', height: '1px', color: 'rgba(203,213,224,255)', 
                                backgroundColor: 'rgba(203,213,224,255)'}}/> 
                    <b>Applicant</b>
                    {/* <hr style={{width: '100%', border: 'none', height: '1px', color: 'rgba(203,213,224,255)', 
                                backgroundColor: 'rgba(203,213,224,255)'}}/>  */}
                    <p style={{margin: 5}}><b>Name: </b>{application.firstName} {application.lastName},</p>
                    <p style={{margin: 5}}><b>Discipline: </b>{application.discipline}</p>
                    <p style={{margin: 5}}><b>Resume: </b><a href={applicationLink}>{application.resume}</a></p>
                    <hr style={{width: '100%', border: 'none', height: '1px', color: 'rgba(203,213,224,255)', 
                                backgroundColor: 'rgba(203,213,224,255)'}}/> 
                    <b>Location</b>
                    {/* <hr style={{width: '100%', border: 'none', height: '1px', color: 'rgba(203,213,224,255)', 
                                backgroundColor: 'rgba(203,213,224,255)'}}/>  */}
                    <p style={{margin: 5}}><b>State/Zip: </b>{application.state}, {application.zip}</p>
                    <p style={{margin: 5}}><b>Preferred Region: </b>{application.region || "None"}</p>
                    <hr style={{width: '100%', border: 'none', height: '1px', color: 'rgba(203,213,224,255)', 
                                backgroundColor: 'rgba(203,213,224,255)'}}/> 
                    <b>Contact</b>
                    {/* <hr style={{width: '100%', border: 'none', height: '1px', color: 'rgba(203,213,224,255)', 
                                backgroundColor: 'rgba(203,213,224,255)'}}/>  */}
                    <p style={{margin: 5}}><b>Email: </b>{application.email}</p>
                    <p style={{margin: 5}}><b>Phone: </b>{application.phone}</p>
                    <hr style={{width: '100%', border: 'none', height: '1px', color: 'rgba(203,213,224,255)', 
                                backgroundColor: 'rgba(203,213,224,255)'}}/> 
                    <b>Miscellaneous</b>
                    {/* <hr style={{width: '100%', border: 'none', height: '1px', color: 'rgba(203,213,224,255)', 
                                backgroundColor: 'rgba(203,213,224,255)'}}/>  */}
                    <p style={{margin: 5}}><b>Date and Time: </b>{moment(application.timestamp).format('M/D/YY h:mm A')}</p>
                    <p style={{margin: 5}}><b>Interested in Telepractice: </b>{application.telepractice ? 'Yes' : 'No'}</p>
                    <p style={{margin: 5}}><b>Bilingual: </b>{application.bilingual ? 'Yes' : 'No'}</p>
                    <p style={{margin: 5}}><b>Allow Emails: </b>{application.emails ? 'Yes' : 'No'}</p>
                    <p style={{margin: 5}}><b>Reference: </b>{application.reference || "None"}</p>
                    <p style={{margin: 5}}><b>Comments: </b><br />{application.comments || "None"}</p>
                </ApplicantView>
            </div>
        )
    }

    return (
        <ApplicantContainer>
            {renderApplication()}
        </ApplicantContainer> 
    ); 
}

function mapStateToProps(state: any, ownProps: any) { 
    return { applications: state.applicationReducer, ViewId: ownProps.ViewId }; 
}

export default connect(mapStateToProps)(View); 