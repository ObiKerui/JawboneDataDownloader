import { combineReducers } from 'redux'

import entities from './entitiesReducer'
import groups from './groupsReducer'
import profile from './profileReducer'
import tweets from './tweetsReducer'
import users from './usersReducer'
import sleeps from './sleepsReducer'

export default combineReducers({
	entities,
	groups,
	profile,
	users,
	sleeps
})