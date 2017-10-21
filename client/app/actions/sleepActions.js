import axios from 'axios'
import async from 'async'
import { loadUsers } from './usersActions'
import { CALL_API, Schemas } from '../middleware/api'

export const FETCH_ALL_SLEEPS_PENDING = 'FETCH_ALL_SLEEPS_PENDING'
export const FETCH_ALL_SLEEPS_FULFILLED = 'FETCH_ALL_SLEEPS_FULFILLED'
export const FETCH_ALL_SLEEPS_REJECTED = 'FETCH_ALL_SLEEPS_REJECTED'

export const FETCH_SLEEPS_PENDING = 'FETCH_SLEEPS_PENDING'
export const FETCH_SLEEPS_FULFILLED = 'FETCH_SLEEPS_FULFILLED'
export const FETCH_SLEEPS_REJECTED = 'FETCH_SLEEPS_REJECTED'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchSleeps = (id) => ({
  [CALL_API]: {
    types: [ FETCH_SLEEPS_PENDING, FETCH_SLEEPS_FULFILLED, FETCH_SLEEPS_REJECTED ],
    endpoint: `users/${id}/sleeps`,
    schema: Schemas.SLEEP_RESPONSE,
    origPayload: { userId: id }
  }
})

const fetchAllSleepsPending = () => ({
	type: FETCH_ALL_SLEEPS_PENDING,
	payload: null
})

const fetchAllSleepsRejected = () => ({
	type: FETCH_ALL_SLEEPS_REJECTED,
	payload: null
})

const fetchAllSleepsDone = () => ({
	type: FETCH_ALL_SLEEPS_FULFILLED,
	payload: null
})

export const loadSleeps = () => (dispatch, getState) => {

	//console.log('call to load the sleeps...')

	dispatch(fetchAllSleepsPending())

	return dispatch(loadUsers()).then(response => {
		//console.log('response from loading users: ', response)

		const userArray = response.payload.result
		
		async.each(userArray, (item, cb) => {
			dispatch(fetchSleeps(item)).then(response => {
				cb()
			})
		}, (err) => {
			if(err) {
				return dispatch(fetchAllSleepsRejected())
			} else {
				return dispatch(fetchAllSleepsDone())
			}
		})
	})	
}

