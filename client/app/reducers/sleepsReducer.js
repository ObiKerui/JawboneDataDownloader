import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import union from 'lodash/union'
import * as sleepActions from '../actions/sleepActions'

const initialTransitInfo = {
	fetching: false,
	cached: false,
	error: null	
}

const transitInfo = (state = initialTransitInfo, action) => {
	switch(action.type) {
		case sleepActions.FETCH_ALL_SLEEPS_PENDING : {
			return { ...state, fetching: true }
		}
		case sleepActions.FETCH_ALL_SLEEPS_REJECTED : {
			return { ...state, fetching: false, error: action.payload }	
		}
		case sleepActions.FETCH_ALL_SLEEPS_FULFILLED : {
			return { ...state, fetching: false, cached: true }	
		}
		default:
			return state;
	}	
}

const idsByUser = (state = [], action) => {
	switch(action.type) {
		case sleepActions.FETCH_SLEEPS_FULFILLED : {
			//console.log('fetch sleep fulfilled : ', action)
			return { ...state, [action.payload.userId]: action.payload.result.items }	
		}
		default: 
			return state
	}
}

const allIds = (state = [], action) => {

	switch(action.type) {
		case sleepActions.FETCH_SLEEPS_FULFILLED : {
			return union([], state, action.payload.result.items)
		}
		default:
			return state;
	}		
}

export default combineReducers({	
	allIds,
	idsByUser,
	transitInfo
})

