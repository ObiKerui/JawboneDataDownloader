const { isLoggedInRestFul, isAuthorized } = require('./middleware')
const { user, group, jawbone } = require('../models')
const { getLoggedInUser, handleResponse } = require('./utils')

//	--------------------------------------------------------
//	DEFINE THE REST API
//	--------------------------------------------------------
const createRestAPI = (app) => {

	//app.use('/api', isLoggedInRestFul)

	app.get('/api/users', (req, res) => {
	    user.get({}, (err, result) => {
	    	handleResponse(err, result, res)		
	    })
	})

	app.get('/api/users/me', (req, res) => {
	    const usr = getLoggedInUser(req, res)
	    handleResponse(null, usr, res)
	})

	app.get('/api/users/:id', (req, res) => {
		user.get({ _id: req.params.id }, (err, user) => {
			handleResponse(err, user, res)
		})
	})

	app.get('/api/users/:id/sleeps', (req, res) => {

		user.get({ 'jawboneData.jawboneId': req.params.id }, (err, user) => {
			const [ singleUser ] = user			

			console.log('single user: ', singleUser)

			jawbone.sleeps(singleUser, (jbError, sleeps) => {
				handleResponse(jbError, sleeps, res)				
			})
		})
	})

	app.get('/api/groups', (req, res) => {
		const user = getLoggedInUser(req, res)
		group.get({}, (result) => {
			res.status(200).json(result)
		})
	})

	app.get('/api/groups/me', (req, res) => {
		const user = getLoggedInUser(req, res)
		group.get({ owner: user._id }, (groups) => {
			res.status(200).json(groups)
		})
	})

	app.get('/api/groups/:id', (req, res) => {
		group.get(req.params.id, (result) => {
			res.status(200).json(result)
		})
	})

	app.get('/api/groups/:id/members', (req, res) => {
		group.getMembers({ _id: req.params.id }, (members) => {

		})
	})

	//	--------------------------------------------------------
	//	SLEEP CALLS
	//	--------------------------------------------------------
	app.get('/api/sleeps/me', (req, res) => {
	    sleeps.get({}, (err, result) => {
	    	handleResponse(err, result, res)		
	    })
	})

	app.get('/api/sleeps/:id', (req, res) => {
		sleeps.get({ _id: req.params.id }, (err, user) => {
			handleResponse(err, user, res)
		})
	})

	// app.get('/sleeps/ticks/:id', isLoggedIn, JBDataCtrl.getSleepTicks);
	// app.get('/sleeps/details/:id', isLoggedIn, JBDataCtrl.getSleepDetails);

	//	--------------------------------------------------------
	//	MOVES CALLS
	//	--------------------------------------------------------
	app.get('/api/moves/me', (req, res) => {
	    moves.get({}, (err, result) => {
	    	handleResponse(err, result, res)		
	    })
	})

	app.get('/api/moves/:id', (req, res) => {
		moves.get({ _id: req.params.id }, (err, user) => {
			handleResponse(err, user, res)
		})
	})

	// app.get('/moves/me', isLoggedIn, JBDataCtrl.getMoves);
	// app.get('/moves/:id', isLoggedIn, isAuthorized, JBDataCtrl.getMoves);

	// app.delete('/groups/:groupId/members/:memberId', isLoggedIn, groupCtrl.removeMemberFromGroup);
	// app.put('/groups/:groupId/members/:memberId', isLoggedIn, groupCtrl.addMemberToGroup);
	// app.get('/groups/:id/admins', isLoggedIn, groupCtrl.getAdmins);
}

module.exports = (app) => {
	createRestAPI(app)
}

