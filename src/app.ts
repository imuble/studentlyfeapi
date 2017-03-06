import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import * as userRouter from './user';

// Creates and configures an ExpressJS web server.
class App {

public express: express.Application;

	constructor() {
		this.express = express();
		this.middleware();
		this.routes();
	}

  // Configure Express middleware.
	private middleware(): void {
		this.express.use(logger('dev'));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
	}

  // Configure API endpoints.
	private routes(): void {
		this.express.use('/', userRouter.initRouter());
	}
}

export default new App().express;