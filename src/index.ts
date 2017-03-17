import app from './app';

import * as mysql from 'mysql';

import dbConfig from './config/mysql_config';

const connection = mysql.createConnection(dbConfig);

connection.connect( (err) => {
	console.log(err);
});

let port = 8080;
app.listen(port, () => {
	console.log('Server is listening on port: ' + port);
});