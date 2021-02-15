import styled, {keyframes} from 'styled-components'; 

export const Container = styled.div`
width: 100%; 
height: 100%; 

display: flex; 
justify-content: center; 
align-items: center; 

font-family: system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji
`; 

const spin = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`

export const Loader = styled.div`
border: 2px solid #f3f3f3; /* Light grey */
border-top: 2px solid #3498db; /* Blue */
border-radius: 50%;
width: 14px;
height: 14px;
animation: ${spin} 2s linear infinite;
`; 

export const Input = styled.input`
    outline: none; 
    box-sizing: border-box; 
    border: none; 

    color: #4a5568; 

    font-family: arial;
    
    border-radius: .25em; 

    font-size: 100%; 

    padding-left: .75rem; 
    padding-right: .75rem; 
    padding-top: .25rem; 
    padding-bottom: .25rem; 

    border: 1px solid #E4E7EB; 

    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    &:focus { 
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }

    ::placeholder { 
        color: lightgray; 
    }
`; 

export const Button = styled.button`
    margin-top: 10px; 
    border: none; 
    padding: 10px; 
    border-radius: 5px; 
    background-color: #616E7C; 
    color: white; 
    width: 100px; 
    cursor: pointer; 
    display: flex; 
    justify-content: center; 
    font-family: system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji,
`; 

export const Label = styled.label`
    color: #4a5568; 
    font-size: .875rem; 
`; 