import React, { useState, useEffect } from 'react'; 

import { Container, Input, Button, Label, Loader } from './Styles'; 

import { getClientHostname, getApiHostname } from 'shared/constants/apiconstants'; 

const Login = (): JSX.Element => { 

    let [username, setUsername] = useState<string>(""); 
    let [password, setPassword] = useState<string>(""); 

    let [error, setError ] = useState<string>(""); 

    let [loading, setLoading ] = useState<boolean>(false); 

    const onLogin = async (): Promise<void> => { 
         setLoading(true); 
         setError(""); 
         await fetch(getApiHostname() + 'login', 
         { 
             method: 'POST', 
             headers: { 
                 'Content-Type': 'application/json', 
                 'Accept': 'application/json'
             }, 
             body: JSON.stringify({ 
                 username: username, 
                 password: password
             })
         })
         .then((result) => result.json())
         .then(jwt => { 
            localStorage.setItem("token", jwt.token); 
            window.location.replace(getClientHostname() + 'dashboard'); 
         })
         .catch((error) => { 
            setError("Login Failed"); 
            setLoading(false); 
         })
    }

    const _handleKeyDown = async (event: React.KeyboardEvent, fn: () => Promise<void>) => { 
        if (event.key === 'Enter') { 
            await fn(); 
        }
    }

    return (<Container>
        <div style={{
                    position: 'absolute', 
                    width: '500px', 
                    height: '300px', 
                    top: '50%', 
                    left: '50%', 
                    margin: '-150px 0 0 -250px', 
                    backgroundColor: 'white', 
                    display: 'flex', 
                    justifyContent: 'flex-start', 
                    flexDirection: 'column', 
                    borderRadius: '.25em', 
                    fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}>
                 <div style={{
                        width: '100%', 
                        height: '50px', 
                        backgroundColor: '#616E7C', 
                        borderRadius: '.25em', 
                        borderBottomLeftRadius: 0, 
                        borderBottomRightRadius: 0, 
                        textAlign: 'center'}}>
                        <h1 style={{color: 'white', fontSize: '16px'}}>Login</h1>
                    </div>
                    <div style={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        flexDirection: 'column', 
                        // textAlign: 'center', 
                        height: '450px'
                    }}>
                        <Label>Username</Label>
                        <Input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}/> 
                        <Label>Password</Label>
                        <Input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} type="password"/> 
                        <Button onClick={onLogin}>{!loading && 'Login'}{loading && <Loader />}</Button>
                        <span>
                            {error}
                        </span>
                    </div>   
        </div>
    </Container>)
}

export default Login; 