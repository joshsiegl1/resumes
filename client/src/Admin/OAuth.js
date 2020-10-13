import React, { Component } from 'react'; 

import { getClientHostname, getApiHostname } from 'shared/constants/apiconstants'; 

export default class OAuth extends Component
{ 
    _isMounted = false; 

    constructor(props) { 
        super(props); 

        this.state = { 
            user: {}, 
            disabled: '', 
            hover: false
        }
    }

    componentDidMount() { 
        this._isMounted = true; 

        const { socket, provider } = this.props; 

        const tokenCheck = setInterval(() => { 
            if (this._isMounted) { 
                if (localStorage.getItem('token')) { 
                    window.location.replace(getClientHostname() + 'dashboard'); 
                }
            }
        }, 1000)

        socket.on(provider, (user) => { 
            this.popup.close(); 
            localStorage.setItem('token', user.jwt); 
        })
    }

    componentWillUnmount() { 
        this._isMounted = false; 
    }

    checkPopup() { 
        const check = setInterval(() => { 
            const { popup } = this
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check)
                this.setState({ disabled: ''})
            }
        }, 1000)
    }

    openPopup() { 
        const { provider, socket } = this.props;
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2) 
        const top = (window.innerHeight / 2) - (height / 2)
        
        const url = `${getApiHostname()}${provider}?socketId=${socket.id}`

        return window.open(url, '',       
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
            scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
            height=${height}, top=${top}, left=${left}`
        )
    }

    startAuth = () => { 
        if (!this.state.disabled) { 
            this.popup = this.openPopup(); 
            this.checkPopup(); 
            this.setState({disabled: 'disabled'})
        }
    }

    closeCard = () => { 
        this.setState({user: {}}); 
    }

    toggleHover = () => this.setState({hover: !this.state.hover})

    render() { 

        let hoverStyle = {}; 
        if (this.state.hover) 
            hoverStyle = { 
                cursor: 'pointer', 
                //boxShadow: '1px 1px 1px #0060a9', 
                color: '#616E7C', 
                border: '2px solid #616E7C'
            }
        
        let customBtn = { 
            ...styles.customBtn, 
            ...hoverStyle
        }

        return (
            <div>
                <div onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} style={customBtn} onClick={this.startAuth}>
                    <img src="https://banner2.cleanpng.com/20180416/xlq/kisspng-g-suite-pearl-river-middle-school-google-software-sign-up-button-5ad4e1a9d11d62.1599053415239008418566.jpg" style={styles.icon}></img>
                    <span style={styles.buttonText}>@ebsunited sign-in</span>
                </div>
            </div>
        )
    }
}

const styles = { 
    buttonText: { 
        display: 'inline-block', 
        verticalAlign: 'middle', 
        paddingLeft: '21px', 
        paddingRight: '42px', 
        fontSize: '14px', 
        fontWeight: 'bold', 
        fontFamily: 'sans-serif'
    }, 
    icon: { 
        //background: 'url("https://google-developers.appspot.com/identity/sign-in/g-normal.png") transparent 5px 50% no-repeat', 
        display: 'inline-block', 
        verticalAlign: 'middle', 
        width: '42px', 
        height: '42px'
    }, 
    customBtn: {
        display: 'inline-block', 
        background: '#F2F2F2', 
        color: 'grey', 
        width: '250px', 
        borderRadius: '.25em', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', 
        whiteSpace: 'nowrap'
    }
}