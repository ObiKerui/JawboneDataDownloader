var passport = require('passport')
var { ids }  = require('../config')

// set up the user model
passport.serializeUser((user, done) => {
	console.log('serialise the user : ', user);
	done(null, user);
})

passport.deserializeUser((id, done) => {
	console.log('deserialise the user : ', id);
	
	// User.get(id, function (err, user) {
	//   done(err, user);
	// });
	
	const err = null
	// const user = {
	// 	_id: '12345',
	// 	name: 'craig'
	// }

	done(err, id);
})

// configure passport for jawbone
require('./jawbone')(passport, ids) // to implement

// export passport
module.exports = passport