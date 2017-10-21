import axios from 'axios'

export function fetchTweets() {
	return function(dispatch) {
		axios.get('http://rest.learncode.academy/api/wstern/users')
		.then((response) => {
			dispatch({ type: 'FETCH_TWEETS_FULFILLED', payload: response.data })
		})
		.catch((err) => {
			dispatch({ type: 'FETCH_TWEETS_REJECTED', payload: err })
		})	
	}
}

export function setTweetName(name) {
	return {
		type: 'SET_TWEET_NAME',
		payload: name
	}
}