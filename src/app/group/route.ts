import * as express from 'express';
import authenticate from '../authentication/middleware/authenticate';
import * as middleware from './middleware/index';

export default function initRouter(): any {
    let router = express.Router();

    router.get('/groups',
        middleware.findAllGroups,
        middleware.returnSuccessWithGroups
    );

    router.post('/groups',
        authenticate,
        middleware.createGroup,
        middleware.returnSuccessWithCreatedGroup
    );

    router.post('/groups/:groupId/members',
        authenticate
    );

    router.delete('/groups/:groupId/members',
        authenticate
    );


    return router;
}