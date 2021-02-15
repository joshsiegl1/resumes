import React, { useState, useEffect } from 'react'; 
import { connect } from 'react-redux'; 

import { useHistory, withRouter } from "react-router-dom";

import moment from 'moment'; 

import Nav from './Nav';  

import { Container, TableBorder, SearchBar, Input, TABLE, TH, TD, TR } from './Styles'; 

import View from './View/index'; 
import Resume from './Resume/index'; 

import * as types from 'shared/store/types'; 
import { APPLICATION_GET } from 'shared/constants/apiconstants'; 
import { Application } from 'shared/constants/interfaces'; 

const Dashboard = ({applications, dispatch} : {applications: Application[], dispatch: any}): JSX.Element => { 
    let [loading, setLoading] = useState<boolean>(true); 

    let [searchText, setSearchText] = useState<string>(""); 

    let [activeId, setActiveId] = useState<number>(); 
    let [activeIndex, setActiveIndex] = useState<number>(0); 
    
    useEffect(() => { 
        async function fetchApplications(): Promise<void> {
            
            let token = localStorage.getItem("token"); 
            
            await fetch(APPLICATION_GET, { headers: { 'authorization': 'bearer ' + token}}).then((response) => response.json()).then((json) => {
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
    
    const mapApplications = (application: Application, index: number): JSX.Element => { 
        let style:any = {}; 
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
        </TR>)
    }

    const renderSearchBar = (): JSX.Element => { 
        return (<SearchBar>
          <b style={{paddingRight: 10}}>Search </b>
          <Input 
            type="text" 
            onChange={(e: any) => { 
                setSearchText(e.target.value)} 
            } /> 
        </SearchBar>)
    }

    const filterApplications = (applications: Application[]): Application[] => { 
        if (searchText === "") { 
            return applications; 
        }


        let filteredApplications: Application[] = []; 
        for (let i = 0; i < applications.length; i++) { 
            if (applications[i].firstName.toLowerCase().includes(searchText.toLowerCase())) {
                filteredApplications.push(applications[i]); 
                continue; 
            }

            if (applications[i].lastName.toLowerCase().includes(searchText.toLowerCase())) { 
                filteredApplications.push(applications[i]); 
                continue; 
            }

            if ((applications[i].firstName.toLowerCase() + " " + applications[i].lastName.toLowerCase())
                .includes(searchText.toLowerCase())) { 
                filteredApplications.push(applications[i]); 
                continue; 
            }

            if (applications[i].email.toLowerCase().includes(searchText.toLowerCase())) { 
                filteredApplications.push(applications[i]); 
                continue; 
            }

            if (applications[i].state.toLowerCase().includes(searchText.toLowerCase())) { 
                filteredApplications.push(applications[i]); 
                continue; 
            }

            if (applications[i].discipline.toLowerCase().includes(searchText.toLowerCase())) { 
                filteredApplications.push(applications[i]); 
                continue; 
            }
        }

        return filteredApplications; 
        
    }

    return (
        <Container>
            <Nav /> 
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                {renderSearchBar()}
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
                                </tr>
                            </thead>
                            <tbody style={{paddingTop: '100px'}}>
                                {filterApplications(applications).map(mapApplications)}
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

export default withRouter(connect(mapStateToProps)(Dashboard)); 