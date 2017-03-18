import * as jwt from "jsonwebtoken";
import * as fs from 'fs';

var path = require('path');
var appDir = path.dirname(require.main.filename);

const publicKey = fs.readFileSync(appDir + '/../certs/jwt/private.pem');

export default function authenticate(req: any, res: any, next: any) {
    let token = req.get('Authorization');
    
    if (!token) {
        return res.status(401).send();
    }

    jwt.verify(token, publicKey, undefined, (err, decoded) => {

        if (err) {
            console.log(err);
            return res.status(401).send();
        }

        req.data.authenticated = true;
        req.data.decodedToken = decoded;

        next();

    });
}