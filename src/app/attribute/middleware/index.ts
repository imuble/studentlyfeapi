
import AttributeRepository from '../repository';
import UserRepository from '../../user/repository';

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
        console.log(attribute._id);
        console.log(attribute.defaultValue);
        
        UserRepository.addAttributeToAllUsers(attribute._id, attribute.defaultValue, (err) => {
            if (err) {
                console.log(err);
            }
            req.data.attribute = attribute;
            return next();
        });
    });
}