import GroupRepository from '../repository'
import UserRepository from "../../user/repository";

export function findAllGroups(req, res, next) {
    let userId = req.data.decodedToken.userId;
    GroupRepository.findAll(userId, (err, groups) => {
        if (err) return res.status(500).send();
        if (!groups) return res.status(404).send();
        else {
            req.data.groups = groups;
            next(null);
        }
    });
}

export function createGroup(req, res, next) {
    let userId = req.data.decodedToken.userId;
    let group = req.body.group;
    GroupRepository.create(group, userId, (err, group) => {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        UserRepository.addGroupToUser(group._id, userId, (err) => {
            if (err) {
                console.log(err);
            }
            req.data.group = group;
            return next();
        });
        req.data.group = group;
        return next();
    });
}

export function returnSuccessWithGroups(req, res, next) {
    return res.status(200).json({groups: req.data.groups});
}

export function returnSuccessWithCreatedGroup(req, res, next) {
    return res.status(200).json({group: req.data.group});
}
