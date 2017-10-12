

//------------------------------------------------------------------------
// isLoggedIn
//------------------------------------------------------------------------
const isLoggedIn = (req, res, next) => {
	
	console.log('is logged in has been called')
	console.log('is authenticated: ', req.isAuthenticated())
	console.log('user is : ', req.user)

    if (req.isAuthenticated()) {
        next();
    } else {	    	
	    // if they aren't redirect them to the home page
	    //return res.redirect('/');
		console.log('User not authenticated. Redirect to home')
	    return res.status(401).redirect('/')
    }
}	

//------------------------------------------------------------------------
// isAuthorized
//------------------------------------------------------------------------
const isAuthorized = (req, res, next) => {
	var roles = req.user.roles || [];
	var roles = Array.isArray(roles) ? roles : [roles];

	for(var i = 0; i < roles.length; i++) {
		if(roles[i] === 'ROLE_ADMIN') {
			console.log('user is authorized');
			return next();
		}
	}

	return res.status(401).redirect('/userdata')
}

//------------------------------------------------------------------------
// exports
//------------------------------------------------------------------------
module.exports = {
	isLoggedIn,
	isAuthorized
}