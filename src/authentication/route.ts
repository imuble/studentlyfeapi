import * as express from 'express';

export default function initRouter(): any {
	let router = express.Router();

	router.post('/login', (req: any, res: any) => {
        return res.status(900).send()
	});

	return router;
}