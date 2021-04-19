require('dotenv').config()
const express = require('express'); 
const session = require('express-session'); 
const cors = require('cors'); 
const http = require('http'); 
const bodyParser = require('body-parser'); 
const process = require('process'); 
const passport = require('passport'); 
const socketio = require('socket.io'); 
const passportInit = require('./lib/passport.init')
const authRouter = require('./lib/auth.router')
const applicationRouter = require('./lib/applications.router'); 
const careerlinksRouter = require('./lib/careerlinks.router'); 
const loginRouter = require('./lib/app.login'); 

const app = express(); 

app.use(cors()); 
app.use(bodyParser.json()); 
app.options('*', cors()); 

let server = http.createServer(app); 

process.on('uncaughtException', function (err) { 
    console.log(err); 
})

app.use(passport.initialize()); 
passportInit(); 

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: true, 
    saveUninitialized: true
}))

const io = socketio(server); 
app.set('io', io); 

app.use('/', authRouter); 
app.use('/', applicationRouter); 
app.use('/', loginRouter); 
app.use('/', careerlinksRouter); 

let fallback = (process.env.NODE_ENV === "production") ? 80 : 5000; 

let port = process.env.PORT || fallback; 

server.listen(port, () => { 
    console.log("listening on port " + port); 
})