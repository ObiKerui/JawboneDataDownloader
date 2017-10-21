import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import union from 'lodash/union'
import * as userActions from '../actions/usersActions'
import * as groupActions from '../actions/groupsActions'

const initialTransitInfo = {
	fetching: false,
	cached: false,
	error: null	
};

const allIds = (state = [], action) => {

	switch(action.type) {
		case 'FETCH_PROFILE_FULFILLED' : {
			return merge([], state, [action.payload.result])
		}	
		case groupActions.FETCH_GROUP_MEMBERS_FULFILLED:	
		case userActions.FETCH_USERS_FULFILLED : {
			return union([], state, action.payload.result)
		}
		default:
			return state;
	}		
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch(action.type) {
		case 'SET_VISIBILITY_FILTER' : 
			return action.filter;
		default:
			return state;
	}
}

const transitInfo = (state = initialTransitInfo, action) => {
	switch(action.type) {
		case userActions.FETCH_USERS_PENDING : {
			return { ...state, fetching: true }
		}
		case userActions.FETCH_USERS_REJECTED : {
			return { ...state, fetching: false, error: action.payload }	
		}
		case userActions.FETCH_USERS_FULFILLED : {
			return { ...state, fetching: false, cached: true }	
		}
		default:
			return state;
	}	
}

export default combineReducers({
	transitInfo,
	allIds,
	visibilityFilter
});

