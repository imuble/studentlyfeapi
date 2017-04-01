import UserRepository from '../repository';
export function verifyPutUserPushTokenBody(req, res, next) {

    let pushToken = req.body.pushToken;

    if (!pushToken) {
        return res.status(422).send();
    }

    return next();
}

export function setAuthenticatedUsersPushToken (req, res, next) {
    let userId = req.data.decodedToken.userId;
    let pushToken = req.body.pushToken;

    UserRepository.setPushToken(userId, pushToken, (err) => {
        if (err) {
            return res.status(500).send();
        }
        return res.status(200).send();
    });
}