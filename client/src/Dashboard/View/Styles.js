import styled from 'styled-components'; 

export const Container = styled.div`
    width: 100%; 
    height: 100%; 
    
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column; 

    font-family: system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji
`; 

export const ApplicantContainer = styled.div`
    height: 500px; 
    margin: 20px;  
    margin-top: 50px; 
    display: flex; 
    justify-content: center; 
`; 

export const ApplicantView = styled.div`
    padding: 1em!important; 
    border: 1px solid rgba(203,213,224,255)!important; 
    border-radius: .5rem!important;
    background-color: white; 
    display: flex; 
    justify-content: center;
    align-content: center; 
    align-items: baseline; 
    color: #4a5568;
    flex-direction: column; 
    width: 200px; 
    font-size: 13px; 
`; 