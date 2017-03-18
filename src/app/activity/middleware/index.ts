import ActivityRepository from '../repository'
import UserRepository from '../../user/repository'
import {IActivity, ActivitySchema} from '../model'
import { IPerformedActivity } from '../../performed_activity/model';


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

/* perform activity */
export function checkIfActivityIsOnCooldown (req, res, next) {
    let performedActivities = req.data.performedActivities;
    let activityId = req.params.activityId;

    let isOnCooldown = false;

    for (let index = 0; index < performedActivities.length; index++) {
        let performedActivity = performedActivities[index];
        let activityStringValue = new String(performedActivity.activity).valueOf();

        if (activityStringValue === activityId) {
            let now = new Date().getTime();
            let readyAt = performedActivity.readyAt.getTime();
            if (now < readyAt) {
                isOnCooldown = true;
                break;
            }
        }
    }

    if (isOnCooldown) {
        return res.status(412).json("The activity is on cooldown");
    }

    next();

}

export function performActivityForUser (req, res, next) {
    let activityId = req.params.activityId;
    let userId = req.data.decodedToken.userId;

    ActivityRepository.findById(activityId, (err, activity) => {
        let performedActivity: IPerformedActivity = {
            activity: activity._id,
            readyAt: new Date().getTime() + activity.cooldown
        };

        UserRepository.pushPerformedActivity(userId, performedActivity, (err) => {
            if (err) {
                return res.status(500).send();
            }
            return next();
        });
    });
}
/* perform activity end */

export function returnSuccessResponse (req, res, next) {
    return res.status(200).send();
}

