var config = require('../config');

//----------------------------------------------------
//  CREATE EXPRESS APPLICATION
//----------------------------------------------------
var express = require('express');
var app = express();

//----------------------------------------------------
//  CONFIGURE SESSION SUPPORT IF REQUIRED
//----------------------------------------------------
const passport = require('../passport')
require('./sessions')(app, passport)

//----------------------------------------------------
//  CONFIGURE CORS SUPPORT IF REQUIRED
//----------------------------------------------------
require('./corsConfig')(app)

//----------------------------------------------------
//  CONFIGURE THE APPLICATION VIEW LOCATIONS
//----------------------------------------------------
//app.use(logger('dev'));
// app.use('/fonts', express.static(__dirname + '/public/fonts'));
// app.use('/assets', express.static(__dirname + '/public/assets'));
// app.use('/styles', express.static(__dirname + '/public/styles'));
app.use('/scripts', express.static(__dirname + '/../public/'));
app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');

//----------------------------------------------------
//  CONFIGURE FOR DB IF REQUIRED AND SET INITIAL STATE
//----------------------------------------------------
const db = require('../db')
require('../db/initDb')(db)

//----------------------------------------------------
//  CONFIGURE THE APPLICATION ROUTES
//----------------------------------------------------
require('../routes')(app, passport);

const createServer = (app) => {
  return app.listen(config.PORT, () => {
   console.log('Express server listening on port ', config.PORT);
   console.log('environment: ', app.get('env'))
  }) 
}

//----------------------------------------------------
//  RUN SERVER
//----------------------------------------------------
if(config.secure === true) {
	// remember to navigate to https://localhost:port not http://localhost:port!
  console.log('create secure server')
  const createSecureServer = require('./secure')
  createSecureServer(app)
} else { // on heroku should be secure anyway
  console.log('create server')
  createServer(app)
}
