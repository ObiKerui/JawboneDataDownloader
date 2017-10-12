const { isLoggedIn, isAuthorized } = require('./middleware')
const Groups = require('../models/jbGroup')
const User = require('../models/user')

//	--------------------------------------------------------
//	DEFINE THE REST API
//	--------------------------------------------------------
const createRestAPI = (app) => {

	//	--------------------------------------------------------
	//	USER CALLS
	//	--------------------------------------------------------
	app.get('/users/me', isLoggedIn, (req, res) => {
	    const usr = res.locals.user
	    res.status(200).json(usr)		
	})

	app.get('/users/:id', isLoggedIn, (req, res) => {
	    const usr = res.locals.user
	    res.status(200).json(usr)		
	})

	//	--------------------------------------------------------
	//	GROUP CALLS
	//	--------------------------------------------------------
	app.get('/groups/me', isLoggedIn, (req, res) => {
		Groups.getAll(owner, (result) => {

		})
	})

	app.get('/groups/:id', isLoggedIn, (req, res) => {
		Groups.get(id, (result) => {

		})
	})

	app.get('/groups/:id/members', isLoggedIn, (req, res) => {
		Groups.getMembers(id, (members) => {

		})
	})

	//	--------------------------------------------------------
	//	SLEEP CALLS
	//	--------------------------------------------------------

	// moves calls


	// app.get('/groups/me', isLoggedIn, groupCtrl.getAll);
	// app.get('/groups/:id', isLoggedIn, groupCtrl.getOne);
	// app.get('/groups/:id/members', isLoggedIn, groupCtrl.getMembers);
	// app.delete('/groups/:groupId/members/:memberId', isLoggedIn, groupCtrl.removeMemberFromGroup);
	// app.put('/groups/:groupId/members/:memberId', isLoggedIn, groupCtrl.addMemberToGroup);
	// app.get('/groups/:id/admins', isLoggedIn, groupCtrl.getAdmins);

	// app.get('/sleeps/me', isLoggedIn, JBDataCtrl.getSleeps);
	// app.get('/sleeps/:id', isLoggedIn, isAuthorized, JBDataCtrl.getSleeps);
	// app.get('/sleeps/ticks/:id', isLoggedIn, JBDataCtrl.getSleepTicks);
	// app.get('/sleeps/details/:id', isLoggedIn, JBDataCtrl.getSleepDetails);

	// app.get('/moves/me', isLoggedIn, JBDataCtrl.getMoves);
	// app.get('/moves/:id', isLoggedIn, isAuthorized, JBDataCtrl.getMoves);

	// app.get('/cardiac/me', isLoggedIn, JBDataCtrl.getCardiac);
	// app.get('/cardiac/:id', isLoggedIn, JBDataCtrl.getCardiac);
	
	// app.get('/trends/me', isLoggedIn, JBDataCtrl.getTrends);
	// app.get('/trends/:id', isLoggedIn, JBDataCtrl.getTrends);

	// app.get('/notes/me', isLoggedIn, notesCtrl.getAllByCurrentUser);
	// app.get('/notes/:id', isLoggedIn, notesCtrl.getOne);
	// app.post('/notes', isLoggedIn, notesCtrl.create);
	// app.put('/notes/:id', isLoggedIn, notesCtrl.update);
	// app.delete('/notes/:id', isLoggedIn, notesCtrl.remove);	
}

module.exports = (app) => {
	createRestAPI(app)
}

