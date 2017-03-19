import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import * as UserFolder from './user';
import * as AuthenticationFolder from './authentication';
import * as ActivityFolder from './activity'
import * as ActivityEffectFolder from './activity_effect'
import * as DynamicDataFolder from './dynamic_data'
import AttributeFolder from './attribute';
import PerformedActivitiesRoute from './performed_activity/route';

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
		this.express.use('/', UserFolder.default.route());
		this.express.use('/', AuthenticationFolder.default.route());
		this.express.use('/', ActivityFolder.default.route());
		this.express.use('/', AttributeFolder.route());
		this.express.use('/', PerformedActivitiesRoute());
		this.express.use('/', ActivityEffectFolder.default.route());
		this.express.use('/', DynamicDataFolder.default.route());
	}
}

export default new App().express;