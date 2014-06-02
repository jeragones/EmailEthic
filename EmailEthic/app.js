
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var compare = require('./routes/compare');
var mysql = require('mysql');
var http = require('http');
var path = require('path');

var app = express();

var connection = mysql.createConnection({
	user: 'Admin',
	password: 'hufVQcVJypRHpKhb',
	host: 'localhost',
	port: 3306, 
	database: 'codigosdb'
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index); // archivo que se ejecuta de inicio
app.get('/users', user.list);
app.get('/ajax/compare', compare.compare);

app.get('/ajax/?*', function(req, res, next) {
	req.fjAjax = true;
	next();
});

connection.connect(function(err) {
   	if (err) console.log("error conexion con la base de datos")
   	else console.log("conexion exitosa con la base de datos")
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports.connection = connection;