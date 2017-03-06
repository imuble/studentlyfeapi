import {UserModel} from './model';
import {UserRepository} from './repository';

import * as express from 'express';

export function initRouter(): any {
	let router = express.Router();

	router.get('/', (req: any, res: any) => {
		return res.status(200).send();
	});

	return router;
}
