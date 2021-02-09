const providers = ['google']; 

const callbacks = providers.map(provider => { 
    return process.env.NODE_ENV === 'production'
    ? `https://ebs-job-apps.herokuapp.com/${provider}/callback`
    : `http://localhost:5000/${provider}/callback`
})

const [ googleURL ] = callbacks; 

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
    ? 'https://ebsjobapps.z22.web.core.windows.net/'
    : ['http://127.0.0.1:3000', 'http://localhost:5000', 'http://localhost:8080']

exports.GOOGLE_CONFIG = { 
    clientID: process.env.GOOGLE_KEY, 
    clientSecret: process.env.GOOGLE_SECRET, 
    callbackURL: googleURL
}