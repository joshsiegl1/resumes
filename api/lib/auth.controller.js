const jwtAuth = require('../lib/auth.jwt'); 

exports.google = (req, res) => { 
    const io = req.app.get('io'); 
    console.log(req.user);
    const user = { 
        name: req.user.displayName, 
        jwt: jwtAuth.sign({ 
            id: req.user.id, 
            name: req.user.displayName
        })
    }
    io.in(req.session.socketId).emit('google', user); 
    res.end(); 
}