import * as jwt from "jsonwebtoken";
import * as fs from 'fs';

var path = require('path');
var appDir = path.dirname(require.main.filename);

const privateKey = fs.readFileSync(appDir + '/../certs/jwt/private.pem');

export default function signToken (req, res, next) {

    let thisUser = req.data.thisUser;

    if (!thisUser) {
        //shit....
    }

    let payload = {
        userId: thisUser._id
    };

    if (!payload) {
        throw new Error();
    }

    jwt.sign(payload, privateKey, {expiresIn: 60*60*24}, (err, token) => {
        if (err) {
            return res.status(500).send();
        }

        req.data.signedTokens = {
            accessToken: token
        };
        next();
    })

}