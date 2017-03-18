import app from './app';

import * as mongoose from 'mongoose';
import mongodbConfig from './config/mongodb_config';

mongoose.connect(mongodbConfig.url, (err) => {
	if (err) {
		console.log(err);
		return;
	}
	/* init models for mongoose */
	require('./app/performed_activity/model');
});

let port = 8080;
app.listen(port, () => {
	console.log('Server is listening on port: ' + port);
});