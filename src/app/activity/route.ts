import * as express from 'express';
import { IActivity, ActivitySchema } from './model';
import ActivityRepository from './repository';
import Authenticate from '../authentication/middleware/authenticate'
import * as middleware from './middleware/index';

export default function initRouter(): any {
    let router = express.Router();

    router.get('/activity/',
        middleware.findAllActivities,
        middleware.returnSuccessWithActivities
    );


    return router;
}