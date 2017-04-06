import * as express from 'express';
import { IUser, UserSchema } from './model';
import UserRepository from './repository';
import authenticate from '../authentication/middleware/authenticate';
import * as PutUserPushTokenMiddleware from './middleware/put_user_pushtoken';
let userRepo = new UserRepository();

export default function initRouter(): any {
	let router = express.Router();

	router.get('/group/:groupId',
		(req: any, res: any) => {

		let groupId = req.params.userId;

		if (!groupId) {
			return res.status(404).json({message: "Group with given id not found"})
		}

		return res.status(200);
	});

	router.post('/groups',
		authenticate,

	)

	router.get('/me/groups',
		authenticate,
		PutUserPushTokenMiddleware.verifyPutUserPushTokenBody,
		PutUserPushTokenMiddleware.setAuthenticatedUsersPushToken
	);

	return router;
}