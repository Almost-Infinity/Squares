const path = require('path');
const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

const app = express();


/*
TODO:
- Add /badbrowser middleware
*/


app.disable('x-powered-by');
app.set('view engine', 'html');
app.use(express.static(path.resolve(__dirname)));

// ====== [ Middlewares ] ======

app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});



app.listen(1337, function () {
	console.log('Express listening on port 1337..');
});