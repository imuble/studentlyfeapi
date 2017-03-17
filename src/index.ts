import app from './app';

import * as mongoose from 'mongoose';
import mongodbConfig from './config/mongodb_config';

mongoose.connect(mongodbConfig.url ,(err) => {
	console.log(err);
});

let port = 8080;
app.listen(port, () => {
	console.log('Server is listening on port: ' + port);
});