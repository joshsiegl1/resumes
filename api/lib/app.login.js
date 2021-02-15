const express = require('express'); 
const router = express.Router(); 
const mysql = require('mysql2/promise');
var jwt = require('jsonwebtoken'); 


router.post('/login', async (req, res) => { 
    let username = req.body.username; 
    let password = req.body.password; 

    const connection = await mysql.createConnection({
        host: process.env.MYSQLSERVERNAME, 
        user: process.env.MYSQLUSER, 
        database: process.env.MYSQLDATABASE, 
        password: process.env.MYSQLPASSWORD
    })

    let [ rows, fields ] = await connection.execute(`
        SELECT * FROM logins WHERE username=? AND password=?
    `, [username, password]); 
    
    if (rows.length > 0)
    {
        let token = jwt.sign({username: username}, 'mysupersecretkey');      
        res.status(200).send(JSON.stringify({token: token}));
    }
    else 
    { 
        res.status(404).send(); 
    }
 
})

module.exports = router; 