import path from 'path';
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';

// Read config
// const { dbHost, dbPort, dbUser, dbPass, dbName } = config.get('database');
const PORT = config.has('server.port') ? config.get('server.port') : 1337;

const app = express();

app.disable('x-powered-by');
app.set('view engine', 'html');


app.use(express.static(path.resolve(__dirname)));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});


app.listen(PORT, () => {
	console.log(`Express listening on port ${PORT}`);
});