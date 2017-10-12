var config = require('./config');
var db = require('./db');
var passport = require('./passport');

//----------------------------------------------------
//  CREATE EXPRESS APPLICATION
//----------------------------------------------------
var express = require('express');
var app = express();

//----------------------------------------------------
//  CREATE MONGO STORE FOR SESSION
//----------------------------------------------------
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//----------------------------------------------------
//  OTHER REQUIREMENTS
//----------------------------------------------------
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var flash = require('connect-flash');
var fs = require('fs');
var https = require('https');
var logger = require('morgan');
var path = require('path');
var proxyMiddleware = require('http-proxy-middleware');
//var request = require('request');

//----------------------------------------------------
//  CONFIGURE THE APPLICATION TO USE PROXY?
//----------------------------------------------------
if(config.useAPIProxy) {
  var proxy = proxyMiddleware('/api', {
    target: config.apiProxyTarget, // here we can specify a rest backend for api calls
    changeOrigin: true,             // for vhosted sites, changes host header to match to target's host
    secure: true
  });
  app.use('/api', proxy);
}

//----------------------------------------------------
//  CONFIGURE THE APPLICATION TO ALLOW CROSS DOMAIN?
//----------------------------------------------------
if(config.allowCrossDomain) {
  var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');

      if ('OPTIONS' == req.method) {
        res.send(200);
      } else {
        next();
      }
  };
  app.use(allowCrossDomain);  
}

console.log(__dirname);

//----------------------------------------------------
//  CONFIGURE THE APPLICATION VIEW LOCATIONS
//----------------------------------------------------
app.use(logger('dev'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/styles', express.static(__dirname + '/public/styles'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//----------------------------------------------------
//  CONFIGURE THE APPLICATION BODY PARSER FOR JSON
//----------------------------------------------------
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//----------------------------------------------------
//  CONFIGURE THE APPLICATION SESSION
//----------------------------------------------------
app.enable('trust proxy'); // optional, not needed for secure cookies
app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  proxy: true,
  cookie: {
    secure: false, // set to true if using https
    maxAge: 3600000,
    store: new MongoStore({ url: config.DB_URL })
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//----------------------------------------------------
//  CONFIGURE THE APPLICATION ROUTES
//----------------------------------------------------
//require('./routes')(app, passport);
require('./routes')(app);

//----------------------------------------------------
//  INITIALISE THE DATABASE
//----------------------------------------------------
//require('./initDB')(db);

//----------------------------------------------------
//  CREATE A SECURE SERVER
//----------------------------------------------------
function createSecureServer(app) {
  var sslOptions = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt')
  };

  return https.createServer(sslOptions, app).listen(config.PORT, function() {
    console.log('Up server listening on port: ' + config.PORT);
    console.log('environment: ' + app.get('env'));
  });  
}

//----------------------------------------------------
//  CREATE A SERVER
//----------------------------------------------------
function createServer(app) {
  return app.listen(config.PORT, function() {
   console.log('Express server listening on port ' + config.PORT);
   console.log('environment: ' + app.get('env'));
  });  
}

//----------------------------------------------------
//  CREATE A SERVER
//----------------------------------------------------
if(config.secureServer === true) {
  console.log('create secure server');
  createSecureServer(app);
} else { // on heroku should be secure anyway
  console.log('create server');  
  createServer(app);
}
