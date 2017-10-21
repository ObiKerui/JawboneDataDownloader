import merge from 'lodash/merge'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = {}, action) => {

	if (action.payload && action.payload.entities) {
    	return merge({}, state, action.payload.entities)
  	}

	return state
}

export default entities;