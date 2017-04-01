import * as express from 'express';
import { IUser, UserSchema } from './model';
import UserRepository from './repository';
import authenticate from '../authentication/middleware/authenticate';
import * as PutUserPushTokenMiddleware from './middleware/put_user_pushtoken';
let userRepo = new UserRepository();

export default function initRouter(): any {
	let router = express.Router();

	router.get('/user/:userId', (req: any, res: any) => {

		let userId = req.params.userId;

		if (!userId) {
			return res.status()
		}

		//let user: UserSchema = userRepo.findById(userId);

		return res.status(200);
	});

	router.put('/me/pushtoken',
	authenticate,
	PutUserPushTokenMiddleware.verifyPutUserPushTokenBody,
	PutUserPushTokenMiddleware.setAuthenticatedUsersPushToken
	);

	return router;
}