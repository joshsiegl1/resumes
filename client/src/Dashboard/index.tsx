import React, { useState, useEffect } from 'react'; 
import { connect } from 'react-redux'; 

import { useHistory, withRouter } from "react-router-dom";

import moment from 'moment'; 

import Nav from './Nav/index';  

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
                {getHighlightedText(application.firstName, searchText)}
            </TD>
            <TD>
                {getHighlightedText(application.lastName, searchText)}
            </TD>
            <TD>
                {getHighlightedText(application.state, searchText)}
            </TD>
            <TD>
                {getHighlightedText(application.discipline, searchText)}
            </TD>
            <TD style={{alignItems: 'center', lineHeight: '25px', display: 'flex', justifyContent: 'start'}}>
            {/* <img style={{marginRight: '5px'}} src='https://thumbs.dreamstime.com/b/linkedin-logo-icon-popular-social-media-element-vector-illustrations-web-internet-white-166811981.jpg' width='25' height='25'></img> */}
            {getLogo(application)}
                {getHighlightedText(application.site, searchText)}
            </TD>
        </TR>)
    }

    const getLogo = (application: Application): JSX.Element => { 
        switch (application.site)
        { 
            case 'CareerBuilder': return (<img style={{marginRight: '5px'}} src='https://doqqkdlppl6bl.cloudfront.net/assets/logos/us_mobile_logo-8ad95cdb7bf0fb83f41753c6fccf1b10616b87a34cc091560922c42725f30bfc.png' width='25' height='25'></img>)
            case 'SpeechPathology.com': return (<img style={{marginRight: '5px'}} src='https://colourlex.com/wp-content/uploads/2021/02/cadmium-red-painted-swatch-1080x675.jpg' width='25' height='25'></img>)
            case 'ASHA.com': return (<img style={{marginRight: '5px'}} src="https://i0.wp.com/speechisbeautiful.com/wp-content/uploads/2015/04/ASHA-logo.jpg" width='25' height='25'></img>)
        }

        return (<img style={{marginRight: '5px'}} src='https://thumbs.dreamstime.com/b/linkedin-logo-icon-popular-social-media-element-vector-illustrations-web-internet-white-166811981.jpg' width='25' height='25'></img>)
    }

    const renderSearchBar = (): JSX.Element => { 
        return (<SearchBar>
          <b style={{paddingRight: 10}}>Search Anything</b>
          <Input 
            type="text" 
            onChange={(e: any) => { 
                setSearchText(e.target.value)} 
            } /> 
        </SearchBar>)
    }

    const getHighlightedText = (text: string, highlight: string) => 
    {
        if (text === null || text === undefined) return <span></span>

        let parts = text.split(new RegExp(`(${highlight})`, 'gi')); 
        return <span>
            { parts.map((part, i) => 
            <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', color: 'dodgerblue' }: { }}>
                { part } 
            </span>)}
        </span>
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

            if (applications[i].site.toLowerCase().includes(searchText.toLowerCase())) { 
                filteredApplications.push(applications[i]); 
                continue; 
            }
        }

        return filteredApplications; 
        
    }

    return (
        <Container>
            <Nav /> 
            <div style={{display: 'flex', justifyContent: 'space-evenly', marginRight: '100px'}}>
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
                                    <TH>
                                        Source
                                    </TH>
                                </tr>
                            </thead>
                            <tbody style={{paddingTop: '100px', fontSize: '13px'}}>
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