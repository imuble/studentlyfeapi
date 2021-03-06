import * as express from 'express';

import ActivityRepository from '../activity/repository';
import AttributeRepository from '../attribute/repository';
import UserRepository from '../user/repository';
import authenticate from '../authentication/middleware/authenticate'

import * as activityMiddleware from '../activity/middleware/index';
import * as attributeMiddleware from '../attribute/middleware/index';
import * as rankMiddleware from '../rank/middleware/index';
import * as userMiddleware from '../user/middleware/userMiddleware'
import * as middleware from './middleware';
import * as performedActivityMiddleware from '../performed_activity/middleware';



export default function initRouter(): any {
    let router = express.Router();

    router.get('/dynamicData',
        authenticate,
        activityMiddleware.findAllActivities,
        attributeMiddleware.findAllAttributes,
        rankMiddleware.findAllRanks,
        performedActivityMiddleware.findAllPerformedActivitiesForUser,
        performedActivityMiddleware.cleanPerformedActivities,
        userMiddleware.getAllUsers,
        middleware.findUserObject,
        middleware.returnSuccessResponseWithDynamicData
    );



    return router;
}