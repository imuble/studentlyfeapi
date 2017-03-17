import app from './app';

import * as mysql from 'mysql';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'simo',
  password : 'simo',
  database : 'studentlyfedb'
});

connection.connect(function(err) {
  if (err) {
    console.error(err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

let port = 8080;
app.listen(port, () => {
	console.log('Server is listening on port: ' + port);
});