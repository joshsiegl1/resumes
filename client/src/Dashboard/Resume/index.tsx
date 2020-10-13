import React, { useState, useEffect} from 'react'; 
import { connect } from 'react-redux'; 

import { Application } from 'shared/constants/interfaces'; 

const Resume = ({applications, ViewId, dispatch}: {applications: Application[], ViewId: number, dispatch: any}): JSX.Element => { 

    let [ application, setApplication ] = useState<Application>(null); 

    useEffect(() => { 
        for (let i = 0; i < applications.length; i++) { 
            if (applications[i].id === ViewId) { 
                setApplication(applications[i]); 
                break; 
            }
        }

    }); 

    const renderResume = (): JSX.Element => { 
        if (application === null) { 
            return (<div></div>)
        }

        let applicationLink = 'https://ebsjobapps.blob.core.windows.net/resumes/' + application.resume; 

        return (<iframe style={{width: '500px', marginTop: '50px'}} src={`http://docs.google.com/gview?url=${applicationLink}&embedded=true`} />)
    }

    return renderResume(); 
}

function mapStateToProps(state: any, ownProps: any) { 
    return { applications: state.applicationReducer, ViewId: ownProps.ViewId }; 
}

export default connect(mapStateToProps)(Resume); 