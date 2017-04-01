import * as express from 'express';

import UserRepository from '../user/repository';
import authenticate from '../authentication/middleware/authenticate'

import * as activityMiddleware from '../activity/middleware/index';
import * as attributeMiddleware from '../attribute/middleware/index';
import * as middleware from './middleware';



export default function initRouter(): any {
    let router = express.Router();

    router.get('/ranks',
        middleware.findAllRanks,
        middleware.returnSuccessResponseWithRanks
    );

    router.post('/ranks',
        authenticate,
        middleware.createRank,
        middleware.returnSuccessResponseWithCreatedRank
    );



    return router;
}