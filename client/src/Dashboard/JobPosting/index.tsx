import React, { useState, useEffect } from 'react'; 

import Nav from '../Nav/index'; 

import { Container, Input, Label, BoxContainer, TextArea, Select, Button } from './Styles'; 

import { TR, TD, TH, TableBorder, TABLE} from '../Styles'; 

import { JOB_POST, JOB_GET } from 'shared/constants/apiconstants'; 

import { Job } from 'shared/constants/interfaces'; 

const JobPosting = (): JSX.Element => {
    
    let [title, setTitle] = useState<string>(); 
    let [state, setState] = useState<string>("Alabama"); 
    let [description, setDescription] = useState<string>(); 
    let [discipline, setDiscipline] = useState<string>("Audiologist"); 
    let [loading, setLoading] = useState<boolean>(false); 
    let [message, setMessage] = useState<string>(""); 
    let [jobs, setJobs] = useState<Job[]>(); 

    useEffect(() => { 
        async function fetchJobPostings()
        {
            await fetch(JOB_GET)
            .then((response) => response.json())
            .then((results: Job[]) => { 
                setJobs(results); 
            })
        }

        fetchJobPostings(); 
    }, [ ])

    const getDisciplines = (): JSX.Element[] => { 
        let discipline: JSX.Element[] = [];
        discipline.push(<option value="Audiologist">Audiologist</option>)
        discipline.push(<option value="Behavior Therapist">Behavior Therapist</option>)
        discipline.push(<option value="Board Certified Behavior Analyst">Board Certified Behavior Analyst</option>)
        discipline.push(<option value="Certified Occupational Therapy Assistant">Certified Occupational Therapy Assistant</option>)
        discipline.push(<option value="Developmental Therapist">Developmental Therapist</option>)
        discipline.push(<option value="Early Childhood Educator - ECSE">Early Childhood Educator - ECSE</option>)
        discipline.push(<option value="Nurse - RN">Nurse - RN</option>)
        discipline.push(<option value="Nurse - LPN">Nurse - LPN</option>)
        discipline.push(<option value="Occupational Therapist">Occupational Therapist</option>)
        discipline.push(<option value="Paraprofessional">Paraprofessional</option>)
        discipline.push(<option value="Physical Therapist">Physical Therapist</option>)
        discipline.push(<option value="Physical Therapist Assistant">Physical Therapist Assistant</option>)
        discipline.push(<option value="Registered Behavior Technician">Registered Behavior Technician</option>)
        discipline.push(<option value="School Psychologist">School Psychologist</option>)
        discipline.push(<option value="Social Worker">Social Worker</option>)
        discipline.push(<option value="Special Instructor">Special Instructor</option>)
        discipline.push(<option value="Speech-Language Pathologist">Speech-Language Pathologist</option>)
        discipline.push(<option value="Speech-Language Pathologist Assistant">Speech-Language Pathologist Assistant</option>)
        discipline.push(<option value="Substitute Teacher">Substitute Teacher</option>)
        discipline.push(<option value="Teacher - English">Teacher - English</option>)
        discipline.push(<option value="Teacher - Math">Teacher - Math</option>)
        discipline.push(<option value="Teacher of the Deaf and Hard of Hearing">Teacher of the Deaf and Hard of Hearing</option>)
        discipline.push(<option value="Teacher - Science">Teacher - Science</option>)
        discipline.push(<option value="Teacher - Social Studies">Teacher - Social Studies</option>)
        discipline.push(<option value="Teacher - Special Education">Teacher - Special Education</option>)
        return discipline; 
    }

    const getStates = (): JSX.Element[] => { 
        let states: JSX.Element[] = []; 

        states.push(<option value="Alabama">Alabama</option>)
        states.push(<option value="Alaska">Alaska</option>)
        states.push(<option value="Arizona">Arizona</option>)
        states.push(<option value="Arkansas">Arkansas</option>)
        states.push(<option value="California">California</option>)
        states.push(<option value="Colorado">Colorado</option>)
        states.push(<option value="Connecticut">Connecticut</option>)
        states.push(<option value="Delaware">Delaware</option>)
        states.push(<option value="Florida">Florida</option>)
        states.push(<option value="Georgia">Georgia</option>)
        states.push(<option value="Hawaii">Hawaii</option>)
        states.push(<option value="Idaho">Idaho</option>)
        states.push(<option value="Illinois">Illinois</option>)
        states.push(<option value="Indiana">Indiana</option>)
        states.push(<option value="Iowa">Iowa</option>)
        states.push(<option value="Kansas">Kansas</option>)
        states.push(<option value="Kentucky">Kentucky</option>)
        states.push(<option value="Louisiana">Louisiana</option>)
        states.push(<option value="Maine">Maine</option>)
        states.push(<option value="Maryland">Maryland</option>)
        states.push(<option value="Massachusetts">Massachusetts</option>)
        states.push(<option value="Michigan">Michigan</option>)
        states.push(<option value="Minnesota">Minnesota</option>)
        states.push(<option value="Mississippi">Mississippi</option>)
        states.push(<option value="Missouri">Missouri</option>)
        states.push(<option value="Montana">Montana</option>)
        states.push(<option value="Nebraska">Nebraska</option>)
        states.push(<option value="Nevada">Nevada</option>)
        states.push(<option value="New Hampshire">New Hampshire</option>)
        states.push(<option value="New Jersey">New Jersey</option>)
        states.push(<option value="New Mexico">New Mexico</option>)
        states.push(<option value="New York">New York</option>)
        states.push(<option value="North Carolina">North Carolina</option>)
        states.push(<option value="North Dakota">North Dakota</option>)
        states.push(<option value="Montana">Montana</option>)
        states.push(<option value="Ohio">Ohio</option>)
        states.push(<option value="Oklahoma">Oklahoma</option>)
        states.push(<option value="Oregon">Oregon</option>)
        states.push(<option value="Pennsylvania">Pennsylvania</option>)
        states.push(<option value="Rhode Island">Rhode Island</option>)
        states.push(<option value="South Carolina">South Carolina</option>)
        states.push(<option value="South Dakota">South Dakota</option>)
        states.push(<option value="Tennessee">Tennessee</option>)
        states.push(<option value="Texas">Texas</option>)
        states.push(<option value="Utah">Utah</option>)
        states.push(<option value="Vermont">Vermont</option>)
        states.push(<option value="Virginia">Virginia</option>)
        states.push(<option value="Washington">Washington</option>)
        states.push(<option value="West Virginia">West Virginia</option>)
        states.push(<option value="Wisconsin">Wisconsin</option>)
        states.push(<option value="Wyoming">Wyoming</option>)

        return states; 
    }

    const onPostJob = async (): Promise<void> => { 
        setMessage(""); 
        if (title === "" || title === undefined) { 
            setMessage("Missing Title");
            return; 
        }
        
        if (description === "" || description === undefined) { 
            setMessage("Missing Description"); 
            return; 
        }

        setLoading(true);
        let body: Job = { 
            title, 
            description, 
            location: state, 
            discipline
        }
        
        await fetch(JOB_POST, { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(body)
        })
        .then((response) => { 
            setLoading(false); 
        })
        .then(async() => { 
            await fetch(JOB_GET)
            .then((response) => response.json())
            .then((results) => { 
                setJobs(results); 
            })
        })
    }

    const renderJobs = (jobs: Job[]): JSX.Element[] => { 
        let j: JSX.Element[] = []; 
        for (let i = 0; i < jobs.length; i++) { 
            let job: Job = jobs[i]; 
            j.push(
                <TR key={job.id}>
                    <TD>{i + 1}</TD>
                    <TD>{job.title}</TD>
                    <TD>{job.location}</TD>
                    <TD>{job.discipline}</TD>
                </TR>
            )
        }
        return j
    }

    return ( 
        <Container>
            <Nav />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> 
                <BoxContainer style={{marginBottom: 0,}}>
                <div style={{textAlign: 'center'}}>
                    <h3 style={{marginBottom: '5px', marginTop: '0px', color: '#4a5568'}}>Post Job to Indeed</h3>
                </div>
                    <Label>Title</Label>
                    <Input onChange={(e: any) => setTitle(e.target.value)}/>
                    <Label>Description</Label>
                    <TextArea style={{width: '500px', height: '150px'}}
                        onChange={(e: any) => setDescription(e.target.value)} /> 
                    <Label>Discipline</Label>
                    <Select
                        value={discipline}
                        onChange={(e: any) => setDiscipline(e.target.value)}>
                        {getDisciplines()}
                    </Select>
                    <Label>Location</Label>
                    <Select
                        value={state}
                        onChange={(e: any) => setState(e.target.value)}>
                        {getStates()}
                    </Select> 
                    <br /> 
                    <Button onClick={onPostJob}>
                    {loading && (<i className="fa fa-refresh fa-spin"></i>)}
                    {!loading && (<b>Post Job</b>)}
                    </Button>
                    <span style={{color: 'red'}}>{message}</span>
                </BoxContainer>
                <BoxContainer style={{marginLeft: '100px', marginBottom: 0, textAlign: 'center'}}>
                    <h3 style={{marginBottom: '5px', marginTop: '0px', color: '#4a5568'}}>Indeed Job Postings</h3>
                <TableBorder style={{height: '500px', margin: 0}}>
                    {jobs === undefined && (<div><i className="fa fa-refresh fa-spin"></i>      <b>Loading Job Postings...</b></div>)}
                    {jobs && (
                        <TABLE>
                            <thead style={{
                                position: 'sticky', 
                                top: 0
                            }}>
                                 <tr>
                                    <TH></TH>
                                    <TH>Title</TH>
                                    <TH>Location</TH>
                                    <TH>Discipline</TH>
                                </tr>
                            </thead>
                            <tbody style={{paddingTop: '100px'}}>
                                {renderJobs(jobs)}
                            </tbody>
                        </TABLE>
                    )}
                </TableBorder>
                </BoxContainer>
            </div>

        </Container>
    )
}

export default JobPosting; 