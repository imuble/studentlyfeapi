import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import UserRoute from './user/route';
import AuthenticationRoute from './authentication/route';
import ActivityRoute from './activity/route'
import DynamicDataRoute from './dynamic_data/route'
import AttributeRoute from './attribute/route';
import PerformedActivitiesRoute from './performed_activity/route';
import * as RankFolder from './rank';

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
		this.express.use((req, res, next) => {
			req.data = {};
			next();
		});
	}

  // Configure API endpoints.
	private routes(): void {
		this.express.use('/', UserRoute());
		this.express.use('/', AuthenticationRoute());
		this.express.use('/', ActivityRoute());
		this.express.use('/', AttributeRoute());
		this.express.use('/', PerformedActivitiesRoute());
		this.express.use('/', DynamicDataRoute());
		this.express.use('/', RankFolder.default.route());
	}
}

export default new App().express;