const async = require('async')
const { group, user } = require('../models')

//--------------------------------------------------------------
// SET UP JAWBONE IDS
//--------------------------------------------------------------
const setUpJawboneIds = (cb) => {
	cb(null)

	// JBCtrl.getIds(function(err, authUsers, authAdmins) {
	// 	if(err) {
	// 		console.log('error getting jawboneIds: ' + err);
	// 		return cb(err);
	// 	} else if(authUsers === null) {
	// 		JBCtrl.createIds(config.jboneAdminIds, config.jbonePatientIds, function(createErr, createdUsers, createdAdmins) {
	// 			if(createErr) {
	// 				console.log('error creating jawbone ids: ' + err);
	// 				return cb(err);
	// 			} else {
	// 				console.log('created jawbone ids: %s %s', JSON.stringify(createdUsers), JSON.stringify(createdAdmins));
	// 				return cb(null, createdUsers, createdAdmins);
	// 			}
	// 		});

	// 	} else {
	// 		console.log('ids exist : patients: %s admins: %s', JSON.stringify(authUsers), JSON.stringify(authAdmins));
	// 		return cb(null, authUsers, authAdmins);
	// 	}
	// })
}

//----------------------------------------------------
//  REMOVE THE DEFAULT GROUP - ID BY TYPE DEFAULT
//----------------------------------------------------
const removeDefaultGroup = (cb) => {

	group.remove({ type: 'default' }, (msg) => {
		return cb(null, msg)
	})
}

//--------------------------------------------------------------
// CREATE DEFAUT GROUP
//--------------------------------------------------------------
const createDefaultGroup = (cb) => {
	
	group.createDefaultGroup(function(newDefaultGroup) {
		if(!newDefaultGroup) {
			return cb('error creating default group');
		} else {
			return cb(null, newDefaultGroup);
		}
	})
}

//--------------------------------------------------------------
// GET ALL THE USERS IN THE SYSTEM
//--------------------------------------------------------------
const getAllUsers = (cb) => {

	user.get({}, (err, users) => {
		(err ? cb(null) : cb(users))
	})
}

//--------------------------------------------------------------
// ADD ALL USERS TO NEWLY CREATED DEFAULT GROUP
//--------------------------------------------------------------
const populateDefaultGroup = (defaultGroup, allUsers, cb) => {

	//console.log('default gruop: ', defaultGroup)
	//console.log('users: ', allUsers)

	const { data } = allUsers

	async.each(data, (user, innercb) => {

		const params = {
			group: defaultGroup,
			user: user, 
			addedBy: user, // want to change this to make more sense
			role: 'USER'
		}

		group.addMember(params, (result) => {
			if(!result) {
				//console.log('user couldnt added to group')
				innercb(null)
			} else {
				//console.log('user added to group')
				innercb(null, result)
			}
		})
	}, cb)
}

//----------------------------------------------------
//  CONFIGURE DB
//----------------------------------------------------
const initDb = (db) => {
	//console.log('init the db')

	async.waterfall([		
		(callback) => {
			setUpJawboneIds(callback)
		},
		(callback) => {
			removeDefaultGroup(callback)
		},
		(msg, callback) => {
			createDefaultGroup(callback)
		},
		(defaultGroup, callback) => {
			getAllUsers((err, users) => {
				if(!users) {
					callback('could not retrieve users')
				} else {
					populateDefaultGroup(defaultGroup, users, callback)
				}
			})
		}
	], (results) => {
		//console.log('result from initialising db: ', result)
		// if(err) {
		// 	console.log('new initialise encountered error: ' + err)
		// } else {
		// 	console.log('new intialise completed: ' + results)	
		// }	
	})
}

//----------------------------------------------------
//  EXPORTS
//----------------------------------------------------
module.exports = db => {		
	initDb(db)		
}
