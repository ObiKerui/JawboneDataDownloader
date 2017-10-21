const { scope } = require('../config')
const { isLoggedIn, isAuthorized } = require('./middleware')

module.exports = (app, passport) => {

	// app.get('/', function(req, res) {
	// 	console.log('get / render the index page');
	//   	res.render('pages/index', { message: req.flash('error') });
	// });

	//------------------------------------------------------------------------
	// root
	//------------------------------------------------------------------------
	app.get('/', (req, res) => {
		console.log('get / render the index page')
	  	res.render('pages/index')
	})

	//------------------------------------------------------------------------
	// login to jawbone - prompted by failing the isJBUser middleware
	//------------------------------------------------------------------------
	app.get('/login/jawbone', 
	  passport.authenticate('jawbone', {
	    scope: scope,
	    failureRedirect: '/'
	  })
	)
	
	//------------------------------------------------------------------------
	// callback for jawbone to complete the 3 way authentication
	//------------------------------------------------------------------------
	app.get('/sleepdata', [
		passport.authenticate('jawbone', { 
			scope: scope, 
			failureRedirect: '/'
		})
	], (req, res) => {
		console.log('do redirect to gateway')
		res.redirect('/superuser-gateway');
	})

	//------------------------------------------------------------------------
	// render the user data page - must be logged in
	//------------------------------------------------------------------------	
	app.get('/userdata', [ isLoggedIn ], (req, res) => {
		//console.log('user : ', req.user)
		res.render('pages/userdata', { user: req.user});
	})

	//------------------------------------------------------------------------
	// render the super user data page - must be logged in and authorized
	//------------------------------------------------------------------------	
	app.get('/superuser-gateway', [isLoggedIn, isAuthorized], (req, res) => {
		//console.log('user : ', req.user)
		res.render('pages/superuser-gateway', { user: req.user });
	})

	//------------------------------------------------------------------------
	// logout of the application
	//------------------------------------------------------------------------	
	app.get('/logout', (req, res) => {
	  req.logout();
	  res.redirect('/');
	})

	//------------------------------------------------------------------------
	// include rest api calls
	//------------------------------------------------------------------------	
	require('./restapi')(app)

	//------------------------------------------------------------------------
	// If no route is matched by now, it must be a 404
	//------------------------------------------------------------------------
	app.use((req, res, next) => {
	  var err = new Error('Not Found: ' + req.url);
	  err.status = 404;
	  next(err);
	})
}