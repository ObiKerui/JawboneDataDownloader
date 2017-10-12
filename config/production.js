module.exports = {

  	//api keys and secret
  	PORT: process.env.PORT || 80,
  	DB_URL : process.env.DB_URL,

	ids : {

	    'jawboneAuth' : {
	        'clientId': process.env.JB_CLIENT_ID,
	        'clientSecret': process.env.JB_CLIENT_SECRET,
	        'authorizationURL': 'https://jawbone.com/auth/oauth2/auth',
	        'tokenURL': 'https://jawbone.com/auth/oauth2/token',
	        'callbackURL': process.env.JB_CB_URL
	    },
	},

	//--------------------------------------------------------------
	// JAWBONE IDS OF ADMINISTRATORS
	//--------------------------------------------------------------
	jboneAdminIds : [
		process.env.JBADMIN_USER_ID
	],

	//--------------------------------------------------------------
	// JAWBONE IDS OF PATIENTS
	//--------------------------------------------------------------
	jbonePatientIds : [
	]	
};