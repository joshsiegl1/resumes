import React, { useState } from 'react'; 

import { Container, BoxContainer, Label, Input, Select, FormDetails, FormEntry, TextArea } from './Styles'; 

import { APPLICATION_POST, RESUME_POST } from 'shared/constants/apiconstants'; 
import { Application } from 'shared/constants/interfaces'; 

const Form = (): JSX.Element => { 

    let [email, setEmail] = useState<string>(); 
    let [zip, setZip] = useState<number>(); 
    let [phone, setPhone] = useState<string>(); 
    let [state, setState] = useState<string>("Alabama"); 
    let [address1, setAddress1] = useState<string>(); 
    let [address2, setAddress2] = useState<string>(); 
    let [city, setCity ] = useState<string>(); 
    let [firstName, setFirstName] = useState<string>(); 
    let [lastName, setLastName] = useState<string>(); 
    let [discipline, setDiscipline] = useState<string>("Audiologist");
    let [reference, setReference] = useState<string>("Banner Ad"); 
    let [region, setRegion] = useState<string>(""); 
    let [bilingual, setBilingual] = useState<boolean>(); 
    let [telepractice, setTelepractice] = useState<boolean>(); 
    let [emails, setEmails ] = useState<boolean>(); 
    let [resume, setResume ] = useState<any>(); 
    let [comments, setComments ] = useState<string>(""); 

    let [ submitting, setSubmitting ] = useState<boolean>(false); 

    let [f_email, f_setEmail] = useState<boolean>(false); 
    let [f_zip, f_setZip] = useState<boolean>(false); 
    let [f_phone, f_setPhone] = useState<boolean>(false); 
    let [f_firstName, f_setFirstName] = useState<boolean>(false); 
    let [f_lastName, f_setLastName] = useState<boolean>(false); 
    let [f_biilngual, f_setBilingual] = useState<boolean>(false); 
    let [f_telepractice, f_setTelepractice] = useState<boolean>(false); 
    let [f_emails, f_setEmails] = useState<boolean>(false); 
    let [f_resume, f_setResume] = useState<boolean>(false); 
    let [f_address1, f_setAddress1] = useState<boolean>(false); 
    let [f_city, f_setCity ] = useState<boolean>(false); 



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

    const getReferences = (): JSX.Element[] => { 
        let references: JSX.Element[] = []; 
        references.push(<option value="Banner Ad">Banner Ad</option>)
        references.push(<option value="Call from Recruiter/HR">Call from Recruiter/HR</option>)
        references.push(<option value="Conference/Event">Conference/Event</option>)
        references.push(<option value="Direct Mail/Postcard">Direct Mail/Postcard</option>)
        references.push(<option value="Friend">Friend</option>)
        references.push(<option value="Job Board Posting">Job Board Posting</option>)
        references.push(<option value="Online Search">Online Search</option>)
        references.push(<option value="Print Advertisement">Print Advertisement</option>)
        references.push(<option value="Social Media">Social Media</option>)
        references.push(<option value="University Professor">University Professor</option>)

        return references; 
    }

    const onFileChange = (event: any): void => { 
        setResume(event.target.files[0]); 
    }

    const onSubmit = async (): Promise<void> => { 

        clearFlags(); 
        if (!ValidateForm()) { 
            return; 
        }

        setSubmitting(true); 

        let renamed = new File([resume], firstName + "_" + lastName + ".pdf", {type: resume.type}); 

        await fileUpload(renamed); 

        let body: Application = { 
            email, 
            address1, 
            address2, 
            city, 
            zip, 
            phone, 
            state, 
            firstName, 
            lastName, 
            discipline, 
            region, 
            comments, 
            reference, 
            telepractice, 
            bilingual, 
            emails, 
            resume: renamed.name
        } 

        await fetch(APPLICATION_POST, { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(body)
        })
        .then((response) => { 
            setSubmitting(false); 
            window.location.replace("https://ebshealthcare.com/apply/appythankyou/"); 
        })
    }

    const fileUpload = async(renamed: File): Promise<void> => { 
        const data = new FormData(); 
        data.append('resume', renamed); 
        await fetch(RESUME_POST, { 
            method: 'POST', 
            body: data 
        })
    }

    const ValidateForm = (): boolean => { 
        let valid: boolean = true; 
        if (email === "" || email === null || email === undefined) { 
            f_setEmail(true); 
            valid = false; 
        }
        if (zip === null || zip === undefined) { 
            f_setZip(true); 
            valid = false; 
        }
        if (firstName === "" || firstName === null || firstName === undefined) { 
            f_setFirstName(true); 
            valid = false; 
        }
        if (lastName === "" || lastName === null || lastName === undefined) { 
            f_setLastName(true); 
            valid = false; 
        }
        if (phone === "" || phone === null || phone === undefined) { 
            f_setPhone(true); 
            valid = false; 
        }
        if (resume === "" || resume === null || resume === undefined) { 
            f_setResume(true); 
            valid = false; 
        }
        if (bilingual === null || bilingual === undefined) { 
            f_setBilingual(true); 
            valid = false; 
        }
        if (emails === null || emails === undefined) { 
            f_setEmails(true); 
            valid = false; 
        }
        if (telepractice === null || telepractice === undefined) { 
            f_setTelepractice(true); 
            valid = false; 
        }
        if (address1 === null || address1 === undefined) { 
            f_setAddress1(true); 
            valid = false; 
        }
        if (city === null || city === undefined) { 
            f_setCity(true); 
            valid = false; 
        }


        return valid; 
    }

    const clearFlags = (): void => { 
        f_setEmail(false); 
        f_setZip(false); 
        f_setFirstName(false); 
        f_setLastName(false); 
        f_setPhone(false); 
        f_setResume(false); 
        f_setBilingual(false); 
        f_setEmails(false); 
        f_setTelepractice(false); 
        f_setAddress1(false); 
        f_setCity(false);
    }

    return (
        <Container>
            <BoxContainer>
                <div style={{textAlign: 'left'}}>
                <h1 style={{marginBottom: 10, color: 'rgb(74, 85, 104)'}}>Apply Now</h1>
                </div>
                <hr style={{
                        width: '100%',
                        maxWidth: 'none',
                        borderWidth: '2px 0 0 0',
                        borderStyle: 'solid',
                        borderColor: 'rgba(0,0,0,.1)',
                        fontSize: '1em'
                }}/> 
                <div style={{marginTop: '10px', marginBottom: '30px'}}>
                    <p>Thank you for your interest in EBS! We have positions available in various settings throughout the country, including our EBS clinics. Join our team today and explore where EBS can take you!</p>
                </div>
                <div style={{width: '100%'}}>
                <FormDetails>
                <FormEntry>
                    <Label>Discipline</Label>
                    <Select 
                        value={discipline}
                        onChange={(e: any) => setDiscipline(e.target.value)}>
                        {getDisciplines()}
                    </Select>
                </FormEntry>
                <h2 style={{fontSize: '20px', width: '100%', color: 'rgb(74, 85, 104)'}}>Contact Information</h2>
                <FormEntry>
                    <Label>First Name</Label>
                    {f_firstName && (<span style={{color: 'red'}}> * First Name is required</span>)}
                    <Input onChange={(e: any) => setFirstName(e.target.value)}/>
                </FormEntry>
                <FormEntry>
                    <Label>Last Name</Label>
                    {f_lastName && (<span style={{color: 'red'}}> * Last Name is required</span>)}
                    <Input onChange={(e: any) => setLastName(e.target.value)}/> 
                </FormEntry>
                <FormEntry>
                    <Label>Email</Label>
                    {f_email && (<span style={{color: 'red'}}> * Email is required</span>)}
                    <Input onChange={(e: any)  => setEmail(e.target.value)}/>
                </FormEntry>
                <FormEntry>
                    <Label>Phone</Label>
                    {f_phone && (<span style={{color: 'red'}}> * Phone is required</span>)}
                    <Input type='number' onChange={(e: any)  => setPhone(e.target.value)}/> 
                </FormEntry>
                <FormEntry>
                    <Label>Address 1</Label>
                    {f_address1 && (<span style={{color: 'red'}}> * Address is required</span>)}
                    <Input onChange={(e: any) => setAddress1(e.target.value)} /> 
                </FormEntry>
                <FormEntry>
                    <Label>Address 2</Label>
                    <Input onChange={(e: any) => setAddress2(e.target.value)} /> 
                </FormEntry>
                <FormEntry>
                    <Label>City</Label>
                    {f_city && (<span style={{color: 'red'}}> * City is required</span>)}
                    <Input onChange={(e: any) => setCity(e.target.value)} /> 
                </FormEntry>
                <FormEntry>
                    <Label>State</Label>
                    <Select 
                        value={state}
                        onChange={(e: any) => setState(e.target.value)}>
                        {getStates()}
                    </Select>
                </FormEntry>
                <FormEntry>
                    <Label>Zip Code</Label>
                    {f_zip && (<span style={{color: 'red'}}> * Zip is required</span>)}
                    <Input type='number' onChange={(e: any)  => setZip(e.target.value)}/> 
                </FormEntry>
                <h2 style={{fontSize: '20px', width: '100%', color: 'rgb(74, 85, 104)'}}>Where would you like to work?</h2>
                <FormEntry>
                    <Label>(city/state or region)</Label>
                    <Input onChange={(e: any) => setRegion(e.target.value)} /> 
                </FormEntry>
                <h3 style={{fontSize: '20px', width: '100%', color: 'rgb(74, 85, 104)'}}>Are you bilingual? {f_biilngual && (<span style={{color: 'red', fontSize: 14, fontStyle: 'none'}}> * Please select an option</span>)}</h3>
                <ul style={{
                    listStyle: 'none',
                    listStyleImage: 'none',
                    listStyleType: 'none',
                    padding: '0px', 
                    margin: 0
                }}>
                    <li>
                        <input onChange={(e: any) => setBilingual(e.target.value)} style={{margin: 10, marginLeft: 0}} type="radio" value="Yes" name="bilingual" /> 
                        <Label>Yes</Label>
                    </li>
                    <li>
                        <input onChange={(e: any) => setBilingual(e.target.value)} style={{margin: 10, marginLeft: 0}} type="radio" value="No" name="bilingual" /> 
                        <Label>No</Label>
                    </li>
                </ul>
                <h3 style={{fontSize: '20px', width: '100%', color: 'rgb(74, 85, 104)'}}>Are you interested in Telepractice? {f_telepractice && (<span style={{color: 'red', fontSize: 14, fontStyle: 'none'}}> * Please select an option</span>)}</h3>
                <ul style={{
                    listStyle: 'none',
                    listStyleImage: 'none',
                    listStyleType: 'none',
                    padding: '0px', 
                    margin: 0
                }}>
                    <li>
                        <input onChange={(e: any) => setTelepractice(e.target.value)} style={{margin: 10, marginLeft: 0}} type="radio" value="Yes" name="telepractice" /> 
                        <Label>Yes</Label>
                    </li>
                    <li>
                        <input onChange={(e: any) => setTelepractice(e.target.value)} style={{margin: 10, marginLeft: 0}} type="radio" value="No" name="telepractice" /> 
                        <Label>No</Label>
                    </li>
                </ul>

                <h3 style={{fontSize: '20px', width: '100%', color: 'rgb(74, 85, 104)'}}>Attach your Resume (.pdf) {f_resume && (<span style={{color: 'red', fontSize: 14, fontStyle: 'none'}}> * Please attach your resume</span>)}</h3>
                <FormEntry>
                    <Input onChange={onFileChange} type='file' accept='.pdf' /> 
                </FormEntry>

                <h3 style={{fontSize: '20px', width: '100%', color: 'rgb(74, 85, 104)'}}>Do you want to receieve emails from us in the future? {f_emails && (<span style={{color: 'red', fontSize: 14, fontStyle: 'none'}}> * Please select an option</span>)}</h3>
                <ul style={{
                    listStyle: 'none',
                    listStyleImage: 'none',
                    listStyleType: 'none',
                    padding: '0px', 
                    margin: 0
                }}>
                    <li>
                        <input onChange={(e: any) => setEmails(e.target.value)} style={{margin: 10, marginLeft: 0}} type="radio" value="Yes" name="emails" /> 
                        <Label>Yes</Label>
                    </li>
                    <li>
                        <input onChange={(e: any) => setEmails(e.target.value)} style={{margin: 10, marginLeft: 0}} type="radio" value="No" name="emails" /> 
                        <Label>No</Label>
                    </li>
                </ul>
                <h3 style={{fontSize: '20px', width: '100%', color: 'rgb(74, 85, 104)'}}>How did you hear about us?</h3>
                <FormEntry>
                    <Select 
                        value={reference}
                        onChange={(e: any) => setReference(e.target.value)}
                    >
                        {getReferences()}
                    </Select>
                </FormEntry>
                <h3 style={{fontSize: '20px', width: '100%', color: 'rgb(74, 85, 104)'}}>Do you have any additonal comments?</h3>
                <TextArea 
                    placeholder='comments' 
                    onChange={(e: any)  => setComments(e.target.value)}/> 

                <button 
                onClick={onSubmit}
                style={{
                    paddingLeft: '20px',
                    paddingRight: '20px', 
                    paddingTop: '10px', 
                    paddingBottom: '10px', 
                    marginTop: '20px',  
                    fontSize: '18px', 
                    backgroundColor: '#0060a9', 
                    color: 'white',
                    fontFamily: 'arial', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer', 
                    width: '100px'
                }}>
                    {submitting && (<i className="fa fa-refresh fa-spin"></i>)}
                    {!submitting && (<b>Submit</b>)}
                </button>
                </FormDetails>
                </div>
            </BoxContainer>
        </Container>
    )
}

export default Form; 