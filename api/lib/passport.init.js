const passport = require('passport'); 
const mysql = require('mysql2'); 
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth'); 

const sql = "INSERT INTO tokens (name, accessToken) VALUES(?,?) ON DUPLICATE KEY UPDATE accessToken=?"

const { GOOGLE_CONFIG } = require("../config"); 

module.exports = () => { 
    passport.serializeUser((user, cb) => cb(null, user)); 
    passport.deserializeUser((obj, cb) => cb(null, obj)); 

    const callback = (accessToken, refreshToken, profile, cb) => { 

        const connection = mysql.createConnection({
            host: process.env.MYSQLSERVERNAME, 
            user: process.env.MYSQLUSER, 
            database: process.env.MYSQLDATABASE, 
            password: process.env.MYSQLPASSWORD
        })

        connection.connect(function (err) { 
            if (err) console.log(err); 
            else { 
                connection.query(sql, [profile.displayName, accessToken, accessToken], function (err, rows, fields) { 
                    if (err) console.log(err); 
                })
            }
        })

        return cb(null, profile); 
    }

    passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback)); 
}