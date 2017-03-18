
import PerformedActivityRepository from '../repository';

export function findAllPerformedActivitiesForUser (req, res, next) {
    
    let userId = req.data.decodedToken.userId;

    PerformedActivityRepository.findAllPerformedActiviesForUser(userId, (err, performedActivities) => {
        
        req.data.performedActivities = performedActivities;
        next();
        
    });

}

export function returnSuccessResponseWithPerformedActivities (req, res, next) {

    let performedActivities = req.data.performedActivities;

    res.status(200).json({performedActivities: performedActivities});
    return next();

}