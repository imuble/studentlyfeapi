import * as jwt from "jsonwebtoken";
import * as fs from 'fs';

const privateKey = fs.readFileSync('private.pem');

export function signToken (req, res, next) {

    let payload = req.data.tokenPayload;

    if (!payload) {
        throw new Error();
    }

    jwt.sign(payload, privateKey, {expiresIn: 60*60*24}, (err, token) => {
        if (err) {
            return res.status(500).send();
        }

        req.data.signedToken = token;

        next();
    })

}