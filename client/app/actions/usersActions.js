import axios from 'axios'

import { CALL_API, Schemas } from '../middleware/api'

export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING'
export const FETCH_USERS_FULFILLED = 'FETCH_USERS_FULFILLED'
export const FETCH_USERS_REJECTED = 'FETCH_USERS_REJECTED'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchUsers = () => ({
  [CALL_API]: {
    types: [ FETCH_USERS_PENDING, FETCH_USERS_FULFILLED, FETCH_USERS_REJECTED ],
    endpoint: 'users',
    schema: Schemas.USER_ARRAY
  }
})

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadUsers = (requiredFields = []) => (dispatch, getState) => {
	// const users = getState().users
	// if (users && requiredFields.every(key => profile.hasOwnProperty(key))) {
	// 	return null
	// }

	//console.log('call to fetch the users...')

	return dispatch(fetchUsers())
}
