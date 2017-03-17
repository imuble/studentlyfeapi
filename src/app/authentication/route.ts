import * as express from 'express';
import * as middleware from './middleware/login';
import signToken from './middleware/signToken';

export default function initRouter(): any {
	let router = express.Router();

	router.post('/login',
	middleware.validateInput,
	middleware.fetchUserFromFacebook,
	signToken,
	middleware.returnSuccessWithTokens
	);

	return router;
}