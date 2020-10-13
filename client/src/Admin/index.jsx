import React from 'react'; 

import OAuth from './OAuth'; 

import io from 'socket.io-client'; 

import { getApiHostname } from 'shared/constants/apiconstants'; 

const socket = io(getApiHostname()); 
const providers = ['google']; 

export default class Admin extends React.Component 
{ 
    render() { 
        const buttons = (providers, socket) => 
        providers.map(provider => 
            <OAuth
                provider={provider}
                key={provider}
                socket={socket}
                history={this.props.history}
        />)

        let b = buttons(providers, socket); 

        return (
            <div>
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
                        textAlign: 'center', 
                        height: '450px'
                    }}>
                    {b}
                    </div>
                </div>
            </div>
        )
    }
}