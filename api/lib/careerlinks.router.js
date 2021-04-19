const express = require('express'); 
const router = express.Router(); 
const mysql = require('mysql2/promise'); 

router.get('/careerlinks', async (req, res) => { 
    const connection = await mysql.createConnection({
        host: process.env.MYSQLSERVERNAME,
        user: process.env.MYSQLUSER,
        database: process.env.MYSQLDATABASE, 
        password: process.env.MYSQLPASSWORD
    })

    const [ rows, fields ] = await connection.execute(`
        SELECT * FROM links
    `); 

    res.status(200).send(JSON.stringify(rows)); 
})

router.post('/job', async (req, res) => { 
    const connection = await mysql.createConnection({
        host: process.env.MYSQLSERVERNAME, 
        user: process.env.MYSQLUSER, 
        database: process.env.MYSQLDATABASE, 
        password: process.env.MYSQLPASSWORD
    })

    let location = req.body.location; 
    let title = req.body.title; 
    let description = req.body.description; 
    let discipline = req.body.discipline; 

    const [rows, fields] = await connection.execute(`
        INSERT INTO jobs (title, description, location, discipline)
        VALUES (?, ?, ?, ?)`, 
        [title, description, location, discipline])

    res.send(200); 
})

router.get('/job', async (req, res) => { 
    const connection = await mysql.createConnection({
        host: process.env.MYSQLSERVERNAME, 
        user: process.env.MYSQLUSER, 
        database: process.env.MYSQLDATABASE, 
        password: process.env.MYSQLPASSWORD
    })

    const [rows, fields] = await connection.execute(`
        SELECT * FROM jobs
    `)

    res.status(200).send(JSON.stringify(rows)); 
})

module.exports = router; 