
import AttributeRepository from '../repository';
import UserRepository from '../../user/repository';
import UserSchema from '../../user/model';

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