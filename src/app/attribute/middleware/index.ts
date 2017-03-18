
import AttributeRepository from '../repository';

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

    return res.status(200).json(req.data.attributes);

}

export function returnSuccessResponse (req, res, next) {
    return res.status(200).send();
}

export function createAttribute(req, res, next) {

    let userId = req.data.decodedToken.userId;
    let attribute = req.body.attribute;
    AttributeRepository.create(userId, attribute, (err) => {
        if (err === true) {
            return res.status(401).send();
        }
        else if (err) {
            console.log(err);
            return res.status(500).send();
        }
        return next();
    });
}