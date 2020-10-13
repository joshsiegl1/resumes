import styled from 'styled-components'; 

export const Container = styled.div`
    width: 100%; 
    height: 100%; 
    
    display: flex; 
    justify-content: center; 
    align-items: center; 

    font-family: system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji
`; 

export const BoxContainer = styled.div`
    @media (max-width: 768px) {
        width: 100%;
    }
    @media (min-width: 768px) { 
        width: 60%; 
    }

    height: auto; 

    border-radius: .25em; 

    margin-top: 9em; 

    background-color: white; 

    padding: 25px; 

    display: flex; 
    justify-content: flex-start; 
    flex-direction: column; 
    align-text: center; 

    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    margin-bottom: 9em; 
`; 

export const FormDetails = styled.div`
    display: flex; 
    justify-content: space-between; 
    align-items: center;
    width: 100%; 
    flex-direction: row; 
    flex-wrap: wrap; 
`; 

export const FormEntry = styled.div`
    @media (max-width: 768px) {
        width: 100%;
    }
    @media (min-width: 768px) { 
        width: 49%; 
    }
`; 

export const Label = styled.label`
    color: #4a5568; 
    font-size: .875rem; 
`; 

export const Select = styled.select`
    outline: none; 
    box-sizing: border-box; 
    width: 100%; 
    border: none; 

    color: #4a5568; 
    
    font-family: arial; 

    border-radius: .25em; 

    margin-top: .75rem; 
    margin-bottom: .75rem; 

    font-size: 100%; 

    padding-left: .75rem; 
    padding-right: .75rem; 
    padding-top: .5rem; 
    padding-bottom: .5rem; 

    border: 1px solid #E4E7EB; 

    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    &:focus { 
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }

    ::placeholder { 
        color: lightgray; 
    }

`; 

export const Input = styled.input`
    outline: none; 
    box-sizing: border-box; 
    width: 100%; 
    border: none; 

    color: #4a5568; 

    font-family: arial;
    
    border-radius: .25em; 

    margin-top: .75rem; 
    margin-bottom: .75rem; 

    font-size: 100%; 

    padding-left: .75rem; 
    padding-right: .75rem; 
    padding-top: .5rem; 
    padding-bottom: .5rem; 

    border: 1px solid #E4E7EB; 

    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    &:focus { 
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }

    ::placeholder { 
        color: lightgray; 
    }
`; 

export const TextArea = styled.textarea`
    outline: none; 
    width: 100%; 
    border: none; 

    color: #4a5568; 

    font-family: arial;
    
    border-radius: .25em; 

    margin-top: .75rem; 
    margin-bottom: .75rem; 

    font-size: 100%; 

    padding-left: .75rem; 
    padding-right: .75rem; 
    padding-top: .5rem; 
    padding-bottom: .5rem; 

    border: 1px solid #E4E7EB; 

    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    &:focus { 
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }

    ::placeholder { 
        color: lightgray; 
    }
`; 