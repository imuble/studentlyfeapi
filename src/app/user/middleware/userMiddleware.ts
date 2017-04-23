import UserRepository from '../repository';

export function getAllUsers (req, res, next) {

    UserRepository.getAllUsers( (err, users) => {
        if (err) {
            return res.status(500).send();
        }
        if(!users) return res.status(404).send();


        for (var i = 0; i < users.length; i++) {
            if(users[i]._id == req.data.decodedToken.userId) users.splice(i,1);
        }

        req.data.users = users;
        next();
    });
}

export function returnSuccessWithAllUsers(req, res, next) {
    return res.status(200).json({users: req.data.users});
}