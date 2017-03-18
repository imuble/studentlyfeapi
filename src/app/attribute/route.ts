import * as express from 'express';

import * as middleware from './middleware';
import authenticate from '../authentication/middleware/authenticate'

import {IAttribute} from '../attribute/model';

export default function initRouter(): any {
	let router = express.Router();

	router.get('/attributes',
    authenticate,
    middleware.findAllAttributes,
    middleware.returnSuccessResponseWithAttributes
    );

    router.post('/attributes',
    authenticate,
    middleware.createAttribute,
    middleware.returnSuccessResponseWithAttribute);

	return router;
}