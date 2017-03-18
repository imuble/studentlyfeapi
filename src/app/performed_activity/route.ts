import * as express from 'express';

import * as middleware from './middleware';
import authenticate from '../authentication/middleware/authenticate'

import {IAttribute} from '../attribute/model';

export default function initRouter(): any {
	let router = express.Router();

	router.get('/me/performedActivities',
    authenticate,
    middleware.findAllPerformedActivitiesForUser,
    middleware.returnSuccessResponseWithPerformedActivities
    );

	return router;
}