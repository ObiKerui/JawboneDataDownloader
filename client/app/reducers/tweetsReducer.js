
export default function reducer(state={
	tweets: [],
	fetching: false,
	fetched: false,
	error: null
}, action) {

	switch(action.type) {
		case 'FETCH_TWEETS_PENDING' : {
			return { ...state, fetching: true }
		}
		case 'FETCH_TWEETS_REJECTED' : {
			return { ...state, fetching: false, error: action.payload }	
		}
		case 'FETCH_TWEETS_FULFILLED' : {
			return { ...state, fetching: false, tweets: action.payload.data }	
		}
	}

	return state;
}