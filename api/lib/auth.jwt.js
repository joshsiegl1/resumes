const fs = require('fs'); 
const jwt = require("jsonwebtoken"); 
const privateKey = fs.readFileSync('./keys/private.key', 'utf8'); 
const publicKey = fs.readFileSync('./keys/public.key', 'utf8'); 

const issuer = 'EBS Healthcare'; 
const subject = 'support@ebsunited.com'; 
const audience = 'http://localhost'; 

module.exports = { 
    sign: (payload) => { 

        const signOptions = { 
            issuer, 
            subject, 
            audience, 
            expiresIn: "30d", 
            algorithm: "RS256"
        }; 

        return jwt.sign(payload, privateKey, signOptions); 
    }, 

    verify: (token) => { 

        const verifyOptions = { 
            issuer, 
            subject, 
            audience, 
            expiresIn: "30d", 
            algorithm: ["RS256"]
        }; 

        try { 
            return jwt.verify(token, publicKey, verifyOptions); 
        }
        catch (err) { 
            return false; 
        }
    }, 

    isAuthenticated: async (req, res, next) => { 
        let token = req.headers['authorization']; 

        if (!token) { 
            res.send(401, "invalid token..."); 
        }

        if (token.startsWith('Bearer ')) { 
            token = token.slice(7, token.length);
            
            if (module.exports.verify(token)) { 
                next(); 
            }
            else { 
                res.send(401, "invalid token"); 
            }
        }
        else { 
            res.send(401, "invalid token..."); 
        }
    }, 

    decode: (token) => { 
        return jwt.decode(token, {complete: true}); 
    }
}