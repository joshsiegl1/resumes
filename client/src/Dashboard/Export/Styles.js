import styled, { keyframes } from 'styled-components'; 

export const Container = styled.div`
    width: 100%; 
    height: 100%; 
    
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column; 

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

export const TH = styled.th`
    color: #4a5568;
    padding-left: 1rem!important; 
    padding-right: 1rem!important; 

    padding-top: 1em!important; 
    padding-bottom: .5rem!important; 

    background-color: white; 

    position: sticky; 
    top: 0; 
`; 

export const TD = styled.td`
    border: 1px solid #e2e8f0;
    box-sizing: border-box; 
    padding-left: 1rem!important; 
    padding-right: 1rem!important; 

    padding-top: .5rem!important; 
    padding-bottom: .5rem!important; 

    color: #4a5568;
`; 

export const Button = styled.button`
    border: none; 
    padding: 10px; 
    border-radius: 5px; 
    background-color: #616E7C; 
    color: white; 
    cursor: pointer; 
    font-family: system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji,
`; 

export const TR = styled.tr`
    cursor: pointer;
    &:hover { 
        background-color: #e2e8f0; 
    }
    background-color: ${props => (props.index % 2 === 0) ? 'white' : 'rgb(247, 250, 252)'} 
`; 

export const TABLE = styled.table`
    border-collapse: collapse; 
    width: 100%; 
`; 

export const ExportBar = styled.div`
    margin-top: 50px; 
    border: 1px solid rgba(203,213,224,255)!important; 
    border-radius: .5rem!important;
    background-color: white; 
    padding: 1em!important; 
    display: flex; 
    align-items: center; 
    color: #4a5568;
`; 

export const Input = styled.input`
    outline: none; 
    box-sizing: border-box; 
    width: 100%; 
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

export const TableBorder = styled.div`
    margin-top: 50px; 
    overflow-y: auto; 
    height: 500px;
    padding-left: 1em!important; 
    padding-right: 1em!important; 
    padding-bottom: 1em!important; 
    border: 1px solid rgba(203,213,224,255)!important; 
    border-radius: .5rem!important;
    background-color: white; 
    display: flex; 
    ${({loading}) => loading && `
        align-items: center; 
        justify-content: center; 
    `}
    
    font-family: Inter var,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji
    `; 