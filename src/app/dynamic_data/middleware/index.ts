import UserRepository from '../../user/repository'


export function returnSuccessResponseWithDynamicData(req, res, next) {

    let activities = req.data.activities;
    let attributes = req.data.attributes;
    let user = req.data.user;
    let ranks = req.data.ranks;

    return res.status(200).json(
        {
            dynamicData:
                {
                    activities: activities,
                    attributes: attributes,
                    ranks: ranks,
                    user: user,
                }

        });
}

export function findUserObject(req, res, next) {
    let userId = req.data.decodedToken.userId;
    UserRepository.findByIdAndPopulate(userId, null, (err, user) => {
        if (err) return res.status(500).send();
        if (!user) return res.status(401).send();
        req.data.user = user;
        next();
    });
}