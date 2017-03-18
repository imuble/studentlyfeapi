import * as express from 'express';
import * as middleware from './middleware/login';
import signToken from './middleware/signToken';
import authenticate from './middleware/authenticate';

export default function initRouter(): any {
	let router = express.Router();

	router.post('/login',
	middleware.validateInput,
	middleware.fetchUserFromFacebook,
	signToken,
	middleware.returnSuccessWithTokens
	);

	router.post('/verify',
	authenticate,
	(req, res, next) => {
		return res.status(200).send();
	});

	return router;
}