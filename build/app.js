const path = require('path');
const config = require('config');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// MongoDB schemas
// const user = require('./models/user');

// Read config
const { dbHost, dbPort, dbUser, dbPass, dbName } = config.get('database');
const PORT = config.has('server.port') ? config.get('server.port') : 1337;




const app = express();

/*
TODO:
- Add /badbrowser middleware
*/


app.disable('x-powered-by');
app.set('view engine', 'html');


app.use(express.static(path.resolve(__dirname)));
app.use(favicon(path.resolve(__dirname, 'favicon.ico')));


app.get('/badbrowser', function (req, res, next) {
	res.send('Enabled javascript needed!');
});

app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});



app.listen(PORT, function () { // 
	mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`, { useNewUrlParser: true }, (err) => {
		if (err) throw err;

		console.log('MongoDB: successfully connected');
		// console.log(mongoose.connection.readyState); // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
	});
	console.log(`Express listening on port ${PORT}`);
});