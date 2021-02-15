const express = require('express'); 
const router = express.Router(); 
const mysql = require('mysql2/promise'); 
const moment = require('moment'); 
const multer = require('multer'); 
const getStream = require('into-stream'); 
const azureStorage = require('azure-storage'); 
const blobService = azureStorage.createBlobService(); 
const jwt = require('jsonwebtoken'); 
const archiver = require('archiver');

var excel = require('excel4node'); 

const inMemoryStorage = multer.memoryStorage(); 
const uploadStrategy = multer({storage: inMemoryStorage }).single('resume'); 

const containerName = 'resumes'; 

function authenticateToken(req, res, next) { 
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send(); 

    jwt.verify(token, 'mysupersecretkey', (err, user) => { 
        if (err) return res.status(403).send(); 

        next(); 
    })
}

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

let continuationToken = null; 
let blobResults = []; 
const listBlobSegments = () => { 
    return new Promise((resolve, reject) => { 
        blobService.listBlobsSegmentedWithPrefix(containerName, "", continuationToken, (err, results) => { 
            if (err) { 
                reject(err); 
            } else { 
                continuationToken = results.continuationToken; 
                blobResults = results.entries; 
                resolve("done"); 
            }
        })
    })
}


const zipOneBlob = (blobName, zip) => { 
    return new Promise((resolve, reject) => { 
        blobService.createReadStream(containerName, blobName, err => { 
            if (err) { 
                reject(err); 
            }
        }).on('data', data => { 
            zip.append(data, { name: blobName }); 
            resolve("done"); 
        }).on('error', err => { 
            reject(err); 
        })
    })
}

router.post('/downloadresumes', authenticateToken, async (req, res) => {
    let zip = archiver('zip').on('error', error => { 
        console.log(error); 
    }) 
    let applications = req.body.applications;  

    for (let i = 0; i < applications.length; i++) { 
        let blobName = applications[i].resume; 
        await zipOneBlob(blobName, zip).then(() => { 
            console.log(blobName + " zipped"); 
        }); 
    }

    res.attachment('resumes.zip'); 
    zip.pipe(res); 
    zip.finalize(); 
})

router.post('/download', authenticateToken, async (req, res) => { 
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

    worksheet.cell(1, 1).string('Lead Updated').style(style); 
    worksheet.cell(1, 2).string('Candidate Source').style(style); 
    worksheet.cell(1, 3).string('First Name').style(style); 
    worksheet.cell(1, 4).string('Middle Name').style(style); 
    worksheet.cell(1, 5).string('Last Name').style(style); 
    worksheet.cell(1, 6).string('Mobile Phone').style(style); 
    worksheet.cell(1, 7).string('Address 1: Street 1').style(style); 
    worksheet.cell(1, 8).string('Address 1: Street 2').style(style); 
    worksheet.cell(1, 9).string('Address 1: City').style(style); 
    worksheet.cell(1, 10).string('ZIP/Postal Code').style(style); 
    worksheet.cell(1, 11).string('Main Phone').style(style); 
    worksheet.cell(1, 12).string('Primary E-mail').style(style); 
    worksheet.cell(1, 13).string('Address 1: Country/Region').style(style); 
    worksheet.cell(1, 14).string('Department').style(style); 
    worksheet.cell(1, 15).string('Contact Type').style(style); 
    worksheet.cell(1, 16).string('Candidate Status').style(style); 
    worksheet.cell(1, 17).string('University Name').style(style); 
    worksheet.cell(1, 18).string('Univ Outreach completed by').style(style); 
    worksheet.cell(1, 19).string('Grad Mth').style(style); 
    worksheet.cell(1, 20).string('Grad Yr').style(style); 
    worksheet.cell(1, 21).string('Willing to Travel').style(style); 
    worksheet.cell(1, 22).string('Willing to Relocate').style(style); 
    worksheet.cell(1, 23).string('Discipline/Position').style(style); 
    worksheet.cell(1, 24).string('Diagnosis/Population Preference').style(style); 
    worksheet.cell(1, 25).string('Position Priority 1').style(style); 
    worksheet.cell(1, 26).string('Position Priority 2').style(style); 
    worksheet.cell(1, 27).string('Position Priority 3').style(style); 
    worksheet.cell(1, 28).string('Rating Notes').style(style); 
    worksheet.cell(1, 29).string('Pref City 1').style(style); 
    worksheet.cell(1, 30).string('Pref State 2').style(style); 
    worksheet.cell(1, 31).string('Pref State 3').style(style); 

    for (let i = 0; i < applications.length; i++) { 
        let row = 2 + i; 
        worksheet.cell(row, 3).string(applications[i].firstName); 
        worksheet.cell(row, 5).string(applications[i].lastName); 
        worksheet.cell(row, 10).string(applications[i].zip); 
        worksheet.cell(row, 11).string(applications[i].phone); 
        worksheet.cell(row, 12).string(applications[i].email); 
        worksheet.cell(row, 13).string('United States'); 
        worksheet.cell(row, 14).string('01'); 
        worksheet.cell(row, 15).string('Recruiting Contact'); 
        worksheet.cell(row, 23).string(applications[i].discipline); 
    }

    workbook.write('test.xlsx', res); 
})

router.get('/application', authenticateToken, async (req, res) => { 

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