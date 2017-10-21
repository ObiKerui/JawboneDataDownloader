import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import * as actions from '../actions/groupsActions'

const initialTransitInfo = {
	fetching: false,
	cached: false,
	error: null	
};

const selectedGroup = (state = {}, action) => {
	switch(action.type) {
		case actions.SET_SELECTED_GROUP: {
			return action.payload
		}
		default:
			return state
	}
}

const allIds = (state = [], action) => {

	switch(action.type) {
		case actions.FETCH_GROUPS_FULFILLED : {
			return merge([], state, action.payload.result)
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
		case actions.FETCH_GROUPS_PENDING : {
			return { ...state, fetching: true }
		}
		case actions.FETCH_GROUPS_REJECTED : {
			return { ...state, fetching: false, error: action.payload }	
		}
		case actions.FETCH_GROUPS_FULFILLED : {
			return { ...state, fetching: false, cached: true }	
		}
		default:
			return state;
	}	
}

export default combineReducers({
	selectedGroup,
	transitInfo,
	allIds,
	visibilityFilter
});

