import * as express from 'express';
import { IActivityEffect, ActivityEffectSchema } from './model';
import ActivityEffectRepository from './repository';
import authenticate from '../authentication/middleware/authenticate'

import * as middleware from './middleware/index';

export default function initRouter(): any {
    let router = express.Router();

    router.get('/activityEffects',
        middleware.findAllActivityEffects,
        middleware.returnSuccessWithActivityEffects
    );

    router.post('/activityEffects',
        authenticate,
        middleware.createActivityIfAdmin,
        middleware.returnSuccessWithCreatedActivity
    );


    return router;
}