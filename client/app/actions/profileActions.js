import axios from 'axios'
import { CALL_API, Schemas } from '../middleware/api'

export const FETCH_PROFILE_PENDING = 'FETCH_PROFILE_PENDING'
export const FETCH_PROFILE_FULFILLED = 'FETCH_PROFILE_FULFILLED'
export const FETCH_PROFILE_REJECTED = 'FETCH_PROFILE_REJECTED'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchProfile = () => ({
  [CALL_API]: {
    types: [ FETCH_PROFILE_PENDING, FETCH_PROFILE_FULFILLED, FETCH_PROFILE_REJECTED ],
    endpoint: 'users/me',
    schema: Schemas.PROFILE
  }
})

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadProfile = (requiredFields = []) => (dispatch, getState) => {
  	const profile = getState().profile.profile
	if (profile && requiredFields.every(key => profile.hasOwnProperty(key))) {
		return null
	}

	return dispatch(fetchProfile())
}

export function setProfileName(name) {
	return {
		type: 'SET_PROFILE_NAME',
		payload: name
	}
}
