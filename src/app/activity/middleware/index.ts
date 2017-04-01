import ActivityRepository from '../repository'
import UserRepository from '../../user/repository'
import { IActivity, ActivitySchema } from '../model'
import { IPerformedActivity } from '../../performed_activity/model';
import * as PushNotifications from '../../../lib/push_notiication';

export function findAllActivities(req, res, next) {
    ActivityRepository.findAll((err, activities) => {
        if (err) return res.status(500).send();
        if (!activities) return res.status(404).send();
        else {
            req.data.activities = activities;
            next(null);
        }
    });
}

export function sendNewActivityPushNotification (req, res, next) {

    let activity = req.data.activity;
    
    let push: PushNotifications.PushNotification = {
        payload: {
            event: 'added',
            entity: 'activity'
        },
        provider: 'gcm'
    }
    UserRepository.getAllPushTokens( (err, tokens) => {
        if (err) {
            return res.status(500).send("could not get pushtokens");
        }
        PushNotifications.sendPushNotification(tokens, push).then( (response) => {
            console.log(response);
            return next();
        }).catch( (err) => {
            console.log(err);
            return res.status(500).send("could not send push");
        });
    });
}

export function returnSuccessWithActivities(req, res, next) {
    let activities = req.data.activities;
    return res.status(200).json({ activities: activities });
}

export function createActivityIfAdmin(req, res, next) {
    let userId = req.data.decodedToken.userId;

    UserRepository.findById(userId, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }  
        if (!user || !user.isAdmin) return res.status(401).send();
        let activity = req.body.activity;
        ActivityRepository.create(activity, userId, (err, activity) => {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }
            else {
                req.data.activity = activity;
                return next();
            }
        });
    });

}


export function returnSuccessWithCreatedActivity(req, res, next) {
    return res.status(200).json({ activity: req.data.activity })
}

/* perform activity */
export function checkIfActivityIsOnCooldown(req, res, next) {
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

export function performActivityForUser(req, res, next) {
    let activityId = req.params.activityId;
    let userId = req.data.decodedToken.userId;
    let targetId = req.body.targetId;

    ActivityRepository.findById(activityId, (err, activity) => {

        if (activity.targetEffects && activity.targetEffects.length === 0 && targetId) {
            return res.status(422).json({ message: "TargetEffects length is 0, but there is a target" });
        }
        if (activity.targetEffects && activity.targetEffects.length > 0 && !targetId) {
            return res.status(422).json({ message: "TargetEffects length is greater than 0, but there is not a target" });
        }

        let performedActivity: IPerformedActivity = {
            activity: activity._id,
            readyAt: new Date().getTime() + activity.cooldown
        };

        UserRepository.pushPerformedActivity(userId, performedActivity, (err) => {
            if (err) {
                return res.status(500).json({message: "Error when pushing performedActivity"});
            }
            /*TODO evaluate success, now always success*/
            let promises = [];
            activity.selfEffects.forEach((selfEffect) => {
                let p = new Promise((resolve, reject) => {

                    UserRepository.doChangeOnAttributeForUser(userId, selfEffect.attribute, selfEffect.change, (err) => {
                        if (err) {
                            console.log("FUCK");
                        }
                        return resolve();
                    });

                });
                promises.push(p);
            });
            activity.targetEffects.forEach((targetEffect) => {
                let p = new Promise((resolve, reject) => {

                    UserRepository.doChangeOnAttributeForUser(targetId, targetEffect.attribute, targetEffect.change, (err) => {
                        if (err) {
                            console.log("FUCK");
                        }
                        resolve();
                    });

                });
                promises.push(p);
            });

            Promise.all(promises)
                .then(() => {
                    return next();
                });
        });


    });
}

export function deleteActivityByIdIfAdmin(req, res, next) {
    let activityId = req.params.activityId;
    let userId = req.data.decodedToken.userId;
    ActivityRepository.deleteActivity(activityId, userId, (err, deletedActivity) => {
        if (err == "404") return res.status(404).send();
        if (err == "403") return res.status(403).send();
        if (err) return res.status(500).json({message: "Error when deleting activity"});
        else {
            req.data.deletedActivity = deletedActivity;
            next();
        }
    });
}

/* perform activity end */

export function returnSuccessResponse(req, res, next) {
    return res.status(200).send();
}

