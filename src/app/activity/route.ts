import * as express from 'express';
import { IActivity, ActivitySchema } from './model';
import ActivityRepository from './repository';
import authenticate from '../authentication/middleware/authenticate'

import * as middleware from './middleware/index';

export default function initRouter(): any {
    let router = express.Router();

    router.get('/activities',
        middleware.findAllActivities,
        middleware.returnSuccessWithActivities
    );

    router.post('/activities',
        authenticate,
        middleware.createActivity,
        middleware.returnSuccessWithCreatedActivity
    );


    return router;
}