import * as jwt from "jsonwebtoken";
import * as fs from 'fs';

const publicKey = fs.readFileSync('../../config/public.pem');

export function authenticate(req: any, res: any, next: any) {
    let token = req.get('Authorization');
    
    if (!token) {
        return res.status(401).send();
    }

    jwt.verify(token, publicKey, undefined, (err, decoded) => {

        if (err) {
            return res.status(401).send();
        }

        req.data.authenticated = true;
        req.data.decodedToken = decoded;

        next();

    });
}