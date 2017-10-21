import axios from 'axios'
import { CALL_API, Schemas } from '../middleware/api'

export const FETCH_GROUPS_PENDING = 'FETCH_GROUPS_PENDING'
export const FETCH_GROUPS_FULFILLED = 'FETCH_GROUPS_FULFILLED'
export const FETCH_GROUPS_REJECTED = 'FETCH_GROUPS_REJECTED'

export const FETCH_GROUP_PENDING = 'FETCH_GROUP_PENDING'
export const FETCH_GROUP_FULFILLED = 'FETCH_GROUP_FULFILLED'
export const FETCH_GROUP_REJECTED = 'FETCH_GROUP_REJECTED'

export const FETCH_GROUP_MEMBERS_PENDING = 'FETCH_GROUP_MEMBERS_PENDING'
export const FETCH_GROUP_MEMBERS_FULFILLED = 'FETCH_GROUP_MEMBERS_FULFILLED'
export const FETCH_GROUP_MEMBERS_REJECTED = 'FETCH_GROUP_MEMBERS_REJECTED'

export const SET_SELECTED_GROUP = 'SET_SELECTED_GROUP'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchGroups = () => ({
  [CALL_API]: {
    types: [ FETCH_GROUPS_PENDING, FETCH_GROUPS_FULFILLED, FETCH_GROUPS_REJECTED ],
    endpoint: 'groups',
    schema: Schemas.GROUP_ARRAY
  }
})

const fetchGroup = (id) => ({
	[CALL_API]: {
		types: [ FETCH_GROUP_PENDING, FETCH_GROUP_FULFILLED, FETCH_GROUP_REJECTED ],
		endpoint: `groups\${id}`,
		schema: Schemas.GROUP
	}
})

const fetchGroupMembers = (id) => ({
  [CALL_API]: {
    types: [ FETCH_GROUP_MEMBERS_PENDING, FETCH_GROUP_MEMBERS_FULFILLED, FETCH_GROUP_MEMBERS_REJECTED ],
    endpoint: `groups/${id}/members`,
    schema: Schemas.USER_ARRAY
  }
})

const setSelectedGroup = (id) => {
	return { 
		type: SET_SELECTED_GROUP,
		payload: id 
	}
}

// Fetches groups (unless it is cached? Howto?).
// Relies on Redux Thunk middleware.
export const loadGroups = (requiredFields = []) => (dispatch, getState) => {
 //  	const groups = getState().entities.groups
	// if (profile && requiredFields.every(key => profile.hasOwnProperty(key))) {
	// 	return null
	// }

	// do we need to fetch from the backend?

	return dispatch(fetchGroups()).then(response => {
		const idArray = response.payload.result
		const id = idArray[0]
		dispatch(setSelectedGroup(id))
		return dispatch(fetchGroupMembers(id))
	})
}

export const loadGroup = (groupId) => (dispatch, getState) => {

	// check if it's cached todo
	
	return dispatch(fetchGroup(groupId)).then(response => {
		const idArray = response.payload.result
		const id = idArray[0]
		console.log('id for selected group', id)
		return dispatch(setSelectedGroup(id))
	});
}