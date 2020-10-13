const express = require('express'); 
const router = express.Router(); 
const mysql = require('mysql2/promise'); 
const moment = require('moment'); 
const multer = require('multer'); 
const getStream = require('into-stream'); 
const azureStorage = require('azure-storage'); 
const blobService = azureStorage.createBlobService(); 

var excel = require('excel4node'); 

const inMemoryStorage = multer.memoryStorage(); 
const uploadStrategy = multer({storage: inMemoryStorage }).single('resume'); 

const containerName = 'resumes'; 


router.post('/application', async (req, res) => { 
    let firstName = req.body.firstName; 
    let lastName = req.body.lastName; 
    let email = req.body.email; 
    let phone = req.body.phone; 
    let state = req.body.state; 
    let zip = req.body.zip; 
    let discipline = req.body.discipline; 
    let telepractice = req.body.telepractice; 
    let emails = req.body.emails; 
    let bilingual = req.body.bilingual; 
    let comments = req.body.comments; 
    let reference = req.body.reference; 
    let region = req.body.region; 
    let resume = req.body.resume; 

    let timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'); 

    const connection = await mysql.createConnection({
        host: process.env.MYSQLSERVERNAME, 
        user: process.env.MYSQLUSER, 
        database: process.env.MYSQLDATABASE, 
        password: process.env.MYSQLPASSWORD
    }); 

    const [ rows, fields ] = await connection.execute(`
    INSERT INTO application (firstName, lastName, email, phone, state, zip, discipline, telepractice, bilingual, emails, comments, reference, region, timestamp, resume) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [firstName, lastName, email, phone, state, zip, discipline, telepractice, bilingual, emails, comments, reference, region, timestamp, resume]); 

    res.status(200).send(); 
}); 

router.post('/resume', uploadStrategy, async (req, res) => { 
    const blobName = req.file.originalname; 
    const stream = getStream(req.file.buffer); 
    const streamLength = req.file.buffer.length; 

    blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err => { 
        if (err) {
            res.status(500).send(err);  
        }

        res.status(200).send(); 
    })
})

router.post('/download', async (req, res) => { 
    let applications = req.body.applications; 

    console.log(applications); 

    var workbook = new excel.Workbook(); 

    var worksheet = workbook.addWorksheet('Sheet 1'); 

    var style = workbook.createStyle({
        font: { 
            color: 'black', 
            size: 12
        }
    })

    worksheet.cell(1, 1).number(100).style(style); 

    workbook.write('test.xlsx', res); 
})

router.get('/application', async (req, res) => { 

    const connection = await mysql.createConnection({
        host: process.env.MYSQLSERVERNAME, 
        user: process.env.MYSQLUSER, 
        database: process.env.MYSQLDATABASE, 
        password: process.env.MYSQLPASSWORD
    }); 

    let [ rows, fields ] = await connection.execute(`SELECT * FROM application`); 

    res.status(200).send(JSON.stringify(rows)); 


})

module.exports = router; 