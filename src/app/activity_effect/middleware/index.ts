import ActivityEffectRepository from '../repository'
import UserRepository from '../../user/repository'
import {IActivityEffect, ActivityEffectSchema} from '../model'


export function findAllActivityEffects(req, res, next) {
    ActivityEffectRepository.findAll((err, activityEffects) => {
        if (err) return res.status(500).send();
        if (!activityEffects) return res.status(404).send();
        else  {
            req.data.activityEffects = activityEffects;
            next(null);
        }
    });
}

export function returnSuccessWithActivityEffects(req, res, next) {
    let activityEffects = req.data.activityEffects;
    return res.status(200).json({activityEffects: activityEffects});
}

export function createActivityEffectIfAdmin(req, res, next) {
    let userId = req.data.decodedToken.userId;

    UserRepository.findById(userId, (err, user) => {
        if (err) return res.status(500).send();
        if (!user || !user.isAdmin) return res.status(401).send();
        let activityEffect = req.body.activityEffect;
        ActivityEffectRepository.create(activityEffect, userId, (err, activityEffect) => {
            if (err) return res.status(500).send();
            else {
                req.data.activityEffect = activityEffect;
                return next();
            }
        });
    });

}


export function returnSuccessWithCreatedActivity(req, res, next) {
    return res.status(200).json({activity: req.data.activityEffect})
}



