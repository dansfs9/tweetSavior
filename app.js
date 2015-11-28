var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var request = require("request");
var Twitter = require('twitter');

var debug = require('debug')('sockettest:server');
var http = require('http');

var app = express();

// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);










// Load the Cloudant library.
var Cloudant = require('cloudant');

var me = 'dansfs'; // Set this to your own account
var password = 'dan09maio1993';

// Initialize the library with my account.
var cloudant = Cloudant({account:me, password:password});
// Specify the database we are going to use (tweet)...
	var alice = cloudant.db.use('tweets');










// Create HTTP server.
var server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Init socket io
var io = require('socket.io').listen(server);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

var client = new Twitter({
	consumer_key: 'WMhj3fzDzME93ayIgjel8wbmE',
	consumer_secret: '2JidV3lfAu5YhQKy9noT48N3bFBhVQTzTyrbEQQ9IKz3rm8yZT',
	access_token_key: '2202115006-pi4QxCTQ62dEe5p1NBu2JOHFrh15a82jztaLyAD',
	access_token_secret: 'ZjwdN77f09eWBQDHXPbGn8uUGTVbvSnEGhkiFRTEfQloo'
});

var states = '-123.2,30.4,-102.5,44.6';
var sampa = '-59.15,-29.96,-38.41,-13.32';
var sanCarlos= '-47.969666,-22.093752,-47.805023,-21.943205';
var sanca = '-47.9924,-22.1342,-47.7644,-21.9199';
var sancaAgora = '-53.1089999,-25.4832678,-44.1609999,-19.7789999';
// var sanCarlos =  ['-47.927685','-22.051755','-47.856617','-21.979185'];
client.stream('statuses/filter', {locations: sanCarlos}, function(stream) {
// client.stream('statuses/filter', {track: 'nba win'}, function(stream) {
	stream.on('data', function(tweet) {
		io.emit('newTweet', tweet);













// 	save on DB


	// // ...and insert a document in it.
	alice.insert( tweet , tweet.id, function(err, body, header) {
		if (err) {
			return console.log('[alice.insert] ', err.message);
		}
	});















	});
	stream.on('error', function(error) {
		throw error;
	});
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

module.exports = app;




/* Utils */

// Normalize a port into a number, string, or false.
function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string'
	? 'Pipe ' + port
	: 'Port ' + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
		case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
		default:
		throw error;
	}
}

// Event listener for HTTP server "listening" event.
function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string'
	? 'pipe ' + addr
	: 'port ' + addr.port;
	debug('Listening on ' + bind);
}
