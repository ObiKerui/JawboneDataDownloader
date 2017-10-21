import { combineReducers } from 'redux'

const id = (state = null, action) => {
	switch(action.type) {
		case 'FETCH_PROFILE_FULFILLED' : {
			return action.payload.result
		}			
	}
	return state;
}

const initialTransitInfo = {
	fetching: false,
	cached: false,
	error: null	
};

const transitInfo = (state = initialTransitInfo, action) => {
	switch(action.type) {
		case 'FETCH_PROFILE_PENDING' : {
			return { ...state, fetching: true }
		}
		case 'FETCH_PROFILE_REJECTED' : {
			return { ...state, fetching: false, error: action.payload }	
		}
		case 'FETCH_PROFILE_FULFILLED' : {
			return { ...state, fetching: false, cached: true }	
		}
		default:
			return state;
	}	
}

export default combineReducers({
	transitInfo,
	id
});
