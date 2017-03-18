
import PerformedActivityRepository from '../repository';
import UserRepository from '../../user/repository';

export function findAllPerformedActivitiesForUser (req, res, next) {
    
    let userId = req.data.decodedToken.userId;

    PerformedActivityRepository.findAllPerformedActiviesForUser(userId, (err, performedActivities) => {
        
        req.data.performedActivities = performedActivities;
        next();
        
    });

}

export function cleanPerformedActivities (req, res, next) {
    let performedActivities = req.data.performedActivities;
    let userId = req.data.decodedToken.userId;

    const promises = [];

    let toBeRemoved = [];

    for (let index = 0; index < performedActivities.length; index++) {
        let element = performedActivities[index];
        
        let now = new Date().getTime();
        let readyAt = element.readyAt.getTime();

        if (readyAt < now) {
            let p = new Promise( (resolve, reject) => {
                UserRepository.removePerformedActivity(userId, element._id, () => {
                    toBeRemoved.push(new String(element._id).valueOf());
                    resolve();
                });
            });
            promises.push(p);
        }
    }

    Promise.all(promises)
    .then( () => {
        req.data.performedActivities.forEach( function (element, index) {
            let idStringValue = new String(element._id).valueOf();
            let shouldFilter = (toBeRemoved.indexOf(idStringValue) >= 0);
            if (shouldFilter) {
                req.data.performedActivities.splice(index, 1);
            }
        });
        next();
    })
    .catch( (err) => {
        console.log(err);
        return res.status(500).send();
    });

}

export function returnSuccessResponseWithPerformedActivities (req, res, next) {

    let performedActivities = req.data.performedActivities;

    res.status(200).json({performedActivities: performedActivities});
    return next();

}