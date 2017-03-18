import * as https from 'https';

import { IUser } from '../../user/model';

import UserRepository from '../../user/repository';

export function validateInput(req, res, next) {

    if (!req.body.fbToken) {
        return res.status(400).send();
    }

    next();

}

export function fetchUserFromFacebook(req, res, next) {

    let fbToken = req.body.fbToken;

    getFbIdByToken(fbToken, (data) => {

        UserRepository.findByFbId(data.id, (err, user) => {

            //this might mean that the data.id (fbId) is invalid format
            if (err) {
                return res.status(500).send();
            }

            //if the user exists, this is a login request
            if (user) {
                req.data.thisUser = user;
                return next();
            }
            //else it is a register request

            getFbUserById(data.id, (data) => {
                let newUser: IUser = {
                    fbId: data.id
                };
                UserRepository.create(newUser, (err, user) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send();
                    }

                    req.data.thisUser = user;

                    next();

                });

            });

        })
    });
}

export function returnSuccessWithTokens (req, res, next) {

    let tokens = req.data.signedTokens;

    return res.status(200).json({tokens: tokens});

}

function getFbIdByToken(token, callback) {
    https.get('https://graph.facebook.com/me?access_token=' + token, function (res) {
        var body = '';
        res.on('data', function (d) {
            body += d;
        });
        res.on('end', function () {
            var parsed = JSON.parse(body);
            callback(parsed);
        });
    });
}
function getFbUserById(id, callback) {
    var options = {
        host: 'graph.facebook.com',
        port: 443,
        path: '/v2.7/' + id + '?fields=name',
        method: 'GET',
        headers: {
            Authorization: 'OAuth 1053547101457803|9026b86af2ea4dc55b3c58908846c84b'
        }
    };
    var req = https.request(options, function (res) {
        var body = '';
        res.on('data', function (d) {
            body += d;
        });
        res.on('end', function () {
            var parsed = JSON.parse(body);
            callback(parsed);
        });
    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}