import ActivityRepository from '../repository'
import UserRepository from '../../user/repository'
import {IActivity, ActivitySchema} from '../model'


export function findAllActivities(req, res, next) {
    ActivityRepository.findAll((err, activities) => {
        if (err) return res.status(500).send();
        if (!activities) return res.status(404).send();
        else  {
            req.data.activities = activities;
            next(null);
        }
    });
}

export function returnSuccessWithActivities(req, res, next) {
    let activities = req.data.activities;
    return res.status(200).json({activities: activities});
}

export function createActivityIfAdmin(req, res, next) {
    let userId = req.data.decodedToken.userId;

    UserRepository.findById(userId, (err, user) => {
        if (err) return res.status(500).send();
        if (!user || !user.isAdmin) return res.status(401).send();
        let activity = req.body.activity;
        ActivityRepository.create(activity, userId, (err, activity) => {
            if (err) return res.status(500).send();
            else {
                req.data.activity = activity;
                return next();
            }
        });
    });

}


export function returnSuccessWithCreatedActivity(req, res, next) {
    return res.status(200).json({activity: req.data.activity})
}



