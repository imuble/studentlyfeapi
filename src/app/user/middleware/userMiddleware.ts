import UserRepository from '../repository';

export function getAllUsers (req, res, next) {

    UserRepository.getAllUsers( (err, users) => {
        if (err) {
            return res.status(500).send();
        }
        if(!users) return res.status(404).send();
        req.data.users = users;
        next();
    });
}

export function returnSuccessWithAllUsers(req, res, next) {
    return res.status(200).json({users: req.data.users});
}