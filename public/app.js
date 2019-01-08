const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

const app = express();


/*
TODO:
- Add /badbrowser middleware
*/


app.disable('x-powered-by');
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express);


// ====== [ Middlewares ] ======

app.get('/', function (req, res) {
	res.render('index');
});



app.listen(1337, function () {
	console.log('Express listening on port 3000..');
});