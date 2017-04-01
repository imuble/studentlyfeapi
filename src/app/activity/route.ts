import * as express from 'express';
import { IActivity, ActivitySchema } from './model';
import ActivityRepository from './repository';
import UserRepository from '../user/repository'
import authenticate from '../authentication/middleware/authenticate';
import * as performedActivityMiddleware from '../performed_activity/middleware';
import * as middleware from './middleware/index';

export default function initRouter(): any {
    let router = express.Router();

    router.get('/activities',
        middleware.findAllActivities,
        middleware.returnSuccessWithActivities
    );

    router.post('/activities',
        authenticate,
        middleware.createActivityIfAdmin,
        middleware.returnSuccessWithCreatedActivity
    );

    router.post('/activities/:activityId/invoke',
    authenticate,
    performedActivityMiddleware.findAllPerformedActivitiesForUser,
    middleware.checkIfActivityIsOnCooldown,
    middleware.performActivityForUser,
    middleware.returnSuccessResponse
    );

    router.delete('/activities/:activityId',
        authenticate,
        middleware.deleteActivityByIdIfAdmin,
        middleware.returnSuccessResponse
    );


    return router;
}