const express = require('express'); 
const router = express.Router(); 
const passport = require('passport'); 
const authController = require('./auth.controller'); 

const scopes = ['profile', 
'https://www.googleapis.com/auth/admin.directory.group.member', 
'https://www.googleapis.com/auth/admin.directory.orgunit', 
'https://www.googleapis.com/auth/admin.directory.user.readonly', 
'https://www.googleapis.com/auth/admin.directory.user', 
'https://www.googleapis.com/auth/gmail.settings.basic', 
'https://www.googleapis.com/auth/gmail.settings.sharing']

const googleAuth = passport.authenticate('google', { scope: scopes}); 

router.get('/google/callback', googleAuth, authController.google); 

router.use((req, res, next) => { 
    req.session.socketId = req.query.socketId; 
    next(); 
})

router.get('/google', googleAuth); 

module.exports = router; 