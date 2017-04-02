
import AttributeRepository from '../repository';
import UserRepository from '../../user/repository';
import UserSchema from '../../user/model';
import * as PushNotifications from '../../../lib/push_notiication';

export function findAllAttributes(req, res, next) {
    AttributeRepository.findAll( (err, attributes) => {
        if (err) {
            return res.status(500).send();
        }

        req.data.attributes = attributes;
        return next();

    });
}

export function returnSuccessResponseWithAttributes(req, res, next) {

    return res.status(200).json({attributes: req.data.attributes});

}

export function returnSuccessResponseWithAttribute (req, res, next) {
    let attribute = req.data.attribute;
    return res.status(200).json({attribute: attribute});
}

export function returnEmptySuccessResponse (req, res, next) {
    return res.status(200).send();
}

export function sendNewAttributePushNotification (req, res, next) {

    let attribute = req.data.attribute;
    
    let push: PushNotifications.PushNotification = {
        payload: {
            event: 'added',
            entity: 'attribute'
        },
        provider: 'gcm'
    }
    UserRepository.getAllPushTokens( (err, tokens) => {
        if (err) {
            return res.status(500).send("could not get pushtokens");
        }
        PushNotifications.sendPushNotification(tokens, push).then( (response) => {
            console.log(response);
            return next();
        }).catch( (err) => {
            console.log(err);
            return res.status(500).send("could not send push");
        });
    });
}

export function deleteAttribute(req, res, next) {
    let userId = req.data.decodedToken.userId;
    let attributeId = req.params.attributeId;

    
    UserSchema.update({'attributes.attribute': attributeId}, {$pull: {'attributes.$.attribute': attributeId}}, {multi: true}, (err) => {
        return res.status(200).send();
    });

    let a = true;
    if(a) {
        return;
    }

    AttributeRepository.delete(userId, attributeId, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({message: "Some error lol"});
        }

        return res.status(200).send();

    });
}

export function createAttribute(req, res, next) {

    let userId = req.data.decodedToken.userId;
    let attribute = req.body.attribute;
    AttributeRepository.create(userId, attribute, (err, attribute) => {
        if (err === true) {
            return res.status(403).json({message: 'You need to be an admin to perform this action'});
        }
        else if (err) {
            console.log(err);
            return res.status(500).send();
        }
        
        UserRepository.addAttributeToAllUsers(attribute._id, attribute.defaultValue, (err) => {
            if (err) {
                console.log(err);
            }
            req.data.attribute = attribute;
            return next();
        });
    });
}