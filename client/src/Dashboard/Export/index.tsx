import React, { useState, useEffect } from 'react'; 
import { connect } from 'react-redux'; 
import DatePicker from 'react-datepicker'; 

import 'react-datepicker/dist/react-datepicker.css'; 

import { useHistory, withRouter } from "react-router-dom";

import moment from 'moment'; 

import Nav from '../Nav/index';  

import { Container, TableBorder, ExportBar, Button, Input, TABLE, TH, TD, TR, Loader } from './Styles'; 

import View from '../View/index'; 
import Resume from '../Resume/index'; 

import * as types from 'shared/store/types'; 
import { APPLICATION_GET, DOWNLOAD_POST, DOWNLOAD_RESUME_POST } from 'shared/constants/apiconstants'; 
import { Application } from 'shared/constants/interfaces'; 

var saveAs = require('file-saver');

const Export = ({applications, dispatch} : {applications: Application[], dispatch: any}): JSX.Element => { 
    let [loading, setLoading] = useState<boolean>(true); 

    let [activeId, setActiveId] = useState<number>(); 
    let [activeIndex, setActiveIndex] = useState<number>(0); 

    let [excluded, setExcluded] = useState<number[]>([]); 

    let [startDate, setStartDate ] = useState<any>(new Date()); 

    let [downloadcsv, setDownloadcsv ] = useState<boolean>(false); 
    let [downloadResume, setDownloadResume ] = useState<boolean>(false); 
    let [download, setDownload ] = useState<boolean>(false); 
    
    useEffect(() => { 
        async function fetchApplications(): Promise<void> { 

            let token = localStorage.getItem("token"); 

            await fetch(APPLICATION_GET, { headers: { 'authorization' : 'bearer ' + token}}).then((response) => response.json()).then((json) => {
                console.log(json); 
                dispatch({ 
                    type: types.SET_APPLICATIONS, 
                    applications: json 
                })
                setLoading(false); 
                setActiveId(json[0].id); 
            }); 
        }

        fetchApplications(); 
    }, [])

    const onApplicationClick = (id: number, index: number): void => { 
        setActiveId(id); 
        setActiveIndex(index); 
    }

    const changeExcluded = (event: any, id: number): void => { 
        let e: number[] = excluded; 
        if (event.target.checked) 
            e.push(id); 
        else { 
            let index: number = e.indexOf(id); 
            if (index > -1)
                e.splice(index, 1); 
        }
        setExcluded(e);  
    }

    const downloadResumes = async (apps: Application[]): Promise<void> => {  
        let token = localStorage.getItem("token"); 

        await fetch(DOWNLOAD_RESUME_POST, { 
            method: 'POST', 
            headers: { 
                'authorization': 'bearer ' + token, 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                applications: apps
            })
        })
        .then((response) => response.blob())
        .then((blob) => { 
            let date = (startDate.getMonth() + 1).toString() + "-" + startDate.getDate().toString() + "-" + startDate.getFullYear().toString(); 
            saveAs(blob, 'resumes_' + date + '.zip'); 
        })
    }

    const downloadCsv = async (apps: Application[]): Promise<void> => { 
        let token = localStorage.getItem("token"); 

        await fetch(DOWNLOAD_POST, { 
            method: 'POST', 
            headers: { 
                'authorization': 'bearer ' + token, 
                'Content-Type': 'application/json'
            },  
            body: JSON.stringify({
                applications: apps
            })
        })
        .then((response) => response.blob())
        .then((blob) => { 
            let date = (startDate.getMonth() + 1).toString() + "-" + startDate.getDate().toString() + "-" + startDate.getFullYear().toString(); 
            saveAs(blob, 'leads_' + date + '.xlsx'); 
        })

    }

    const onDownloadClicked = async (): Promise<void> => { 
        setDownload(true); 
        let apps = filterExcluded(filterDate(applications)); 
        if (apps.length <= 0) { 
            alert("No applications were submitted for this date"); 
            setDownload(false); 
            return; 
        }
        Promise.all([downloadCsv(apps), downloadResumes(apps)]).then(() => { 
            setDownload(false); 
        }); 
    }

    const onDownloadInstructions = async (): Promise<void> => { 
        alert("Instructions Unavailable at this time"); 
    }

    const mapApplications = (application: Application, index: number): JSX.Element => { 
        let style:any = {}; 
        if (excluded.indexOf(application.id) > -1) { 
            style.backgroundColor = '#dcbcbc'; 
        }
        if (index === activeIndex) { 
            style.backgroundColor = '#bccadc'; 
        }

        return (
        <TR key={application.id} onClick={() => onApplicationClick(application.id, index)} index={index} style={style}>
            <TD>
                {index + 1}
            </TD>
            <TD>
                {moment(application.timestamp).format('M/D/YY h:mm A')}
            </TD>
            <TD>
                {application.firstName}
            </TD>
            <TD>
                {application.lastName}
            </TD>
            <TD>
                {application.state}
            </TD>
            <TD>
                {application.discipline}
            </TD>
            <TD>
                <input type='checkbox' onClick={(e) => changeExcluded(e, application.id)}/> 
            </TD>
        </TR>)
    }

    const renderExportBar = (): JSX.Element => { 
        return (<ExportBar>
          <b style={{paddingRight: 10}}>Export </b>
          <DatePicker selected={startDate} onChange={date => { 
              setStartDate(date); 
              setExcluded([]); 
            }}/> 
          <Button style={{marginLeft: 10}} onClick={onDownloadClicked}>{download && (<Loader />)}{!download && ("Download Files")}</Button>
          <Button style={{marginLeft: 10}} onClick={onDownloadInstructions}>View Instructions</Button>
        </ExportBar>)
    }

    const filterExcluded = (applications: Application[]): Application[] => { 
        let filteredApplications: Application[] = []; 

        for (let a = 0; a < applications.length; a++) {
            let include: boolean = true;  
            for (let i = 0; i < excluded.length; i++) { 
                if (applications[a].id === excluded[i]) { 
                    include = false; 
                }
            }

            if (include) { 
                filteredApplications.push(applications[a]); 
            }
        }


        return filteredApplications; 
    }

    const filterDate = (applications: Application[]): Application[] => { 
        let filterApplications: Application[] = []; 

        let selectedDay = startDate.getDate(); 
        let selectedMonth = startDate.getMonth(); 
        let selectedYear = startDate.getFullYear(); 

        for (let i = 0; i < applications.length; i++) {
            let appDay = new Date(applications[i].timestamp).getDate(); 
            let appMonth = new Date(applications[i].timestamp).getMonth(); 
            let appYear = new Date(applications[i].timestamp).getFullYear(); 

            if (selectedMonth === appMonth && selectedDay === appDay && selectedYear === appYear) { 
                filterApplications.push(applications[i]); 
            }
            
        }

        return filterApplications; 
    }

    return (
        <Container>
            <Nav /> 
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                {renderExportBar()}
                <TableBorder loading={(loading ? 1 : 0)}>
                    {loading && (<div><i className="fa fa-refresh fa-spin"></i>   Loading Application Data...</div>)}
                    {!loading && (
                        <TABLE>
                            <thead style={{
                                position: 'sticky', 
                                top: 0
                            }}>
                                <tr>
                                    <TH></TH>
                                    <TH>
                                        Date and Time
                                    </TH>
                                    <TH>
                                        First Name
                                    </TH>
                                    <TH>
                                        Last Name
                                    </TH>
                                    <TH>
                                        State
                                    </TH>
                                    <TH>
                                        Discipline
                                    </TH>
                                    <TH>
                                        Exclude
                                    </TH>
                                </tr>
                            </thead>
                            <tbody style={{paddingTop: '100px'}}>
                                {filterDate(applications).map(mapApplications)}
                            </tbody>
                        </TABLE>
                    )}
                </TableBorder>
                </div>
            <View ViewId={activeId} /> 
            <Resume ViewId={activeId} /> 
            </div>
        </Container>
    ); 

}

function mapStateToProps(state: any) { 
    return {applications: state.applicationReducer}; 
}

export default withRouter(connect(mapStateToProps)(Export)); 