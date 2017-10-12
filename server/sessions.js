
//----------------------------------------------------
//  CREATE MONGO STORE FOR SESSION
//----------------------------------------------------
const config = require('../config')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const { secret, DB_URL } = require('../config')

//----------------------------------------------------
//  CONFIGURE THE APPLICATION SESSION
//----------------------------------------------------
const configureSession = (app, passport) => {

	//----------------------------------------------------
	//  CONFIGURE THE APPLICATION BODY PARSER FOR JSON
	//----------------------------------------------------
	app.use(bodyParser.json({limit: '5mb'}))
	app.use(bodyParser.json({ type: 'application/json' }))
	app.use(bodyParser.urlencoded({ extended: true }))
	
	app.use(cookieParser())
	app.enable('trust proxy') // optional, not needed for secure cookies
	app.use(session({
	  secret: secret,
	  resave: true,
	  saveUninitialized: true,
	  proxy: true,
	  cookie: {
	    secure: false, // set to true if using https
	    maxAge: 3600000,
	    store: new MongoStore({ url: DB_URL })
	  }
	}))
	app.use(flash())

	if(passport) {
		app.use(passport.initialize())
		app.use(passport.session()) // persistent login sessions
	}
}

module.exports = (app, passport) => {
	configureSession(app, passport)
}
