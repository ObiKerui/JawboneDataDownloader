const { ids, dbconnectString, userdbconnectString, secret, jboneAdminIds, jbonePatientIds } = require('./auth')

module.exports = {

	// how to create the server
	secure: true,

	//api keys and secret
	PORT: 5000,

	// control flags
	logLevel: 'debug',

	// pull in data from auth
	ids : ids,
	secret: secret,
	DB_URL: dbconnectString,
	USERS_DB_URL: userdbconnectString,
	scope: require('./jawboneScope'),
	jboneAdminIds: jboneAdminIds,
	jbonePatientIds: jbonePatientIds
}