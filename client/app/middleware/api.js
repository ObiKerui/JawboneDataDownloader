import axios from 'axios'
import { normalize, schema } from 'normalizr'
import { camelizeKeys } from 'humps'
import callApiFake from './fakeBackend'
import merge from 'lodash/merge'

const instance = axios.create({baseURL: 'https://localhost:5000/api'})

const fakeBackEnd = false;

//  -----------------------------------------------------------
//  PROCESS RESPONSE
//  -----------------------------------------------------------
const processResponse = (response, schema) => {

	const camelizedJson = camelizeKeys(response)

  //console.log('camelizedJson: ', camelizedJson)

	const toRet = Object.assign({}, normalize(camelizedJson, schema))
	
	return toRet;	
}

//  -----------------------------------------------------------
// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
//  -----------------------------------------------------------
const callApi = (endpoint, schema) => {
	//const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

	if(fakeBackEnd) {
		return callApiFake(endpoint)		
		.then((response) => {
			return processResponse(response.data, schema)
		})
	}

	return instance.get(endpoint)
	.then((response) => {

    //console.log('the response: ', response)

		if (response.status !== 200) {
      return Promise.reject(response)
    }
    return processResponse(response.data, schema)
	})
	.catch((err) => {    
		return Promise.reject(err)
	})	
}

//	--------------------------------------------------
// 	USER SCHEMA 
//	--------------------------------------------------
// const userSchema = new schema.Entity('user', {}, {
//   //idAttribute: user => user.login.toLowerCase()
// })
const userSchema = new schema.Entity('users', undefined, {
  idAttribute: entity => entity.jawboneData.jawboneId
})

//	--------------------------------------------------
// 	GROUP SCHEMA 
//	--------------------------------------------------
const groupSchema = new schema.Entity('groups')

//  --------------------------------------------------
//  SLEEP SCHEMA 
//  --------------------------------------------------
const sleepSchema = new schema.Entity('sleeps', undefined, {
  idAttribute: entity => entity.xid
})

const sleepResponseSchema = { 
  items: new schema.Array(sleepSchema) 
}

// const groupSchema = new schema.Entity('groups', {
//   owner: userSchema
// }, {
//   //idAttribute: repo => repo.fullName.toLowerCase()
// })

//	--------------------------------------------------
// 	Schemas 
//	--------------------------------------------------
export const Schemas = {
	PROFILE: userSchema,
  	USER: userSchema,
  	USER_ARRAY: [userSchema],
  	GROUP: groupSchema,
  	GROUP_ARRAY: [groupSchema],
    SLEEP: sleepSchema,
    SLEEP_ARRAY: [sleepSchema],
    SLEEP_RESPONSE: sleepResponseSchema
}

//	--------------------------------------------------
// 	Action key that carries API call info interpreted by this Redux middleware.
//	--------------------------------------------------
export const CALL_API = 'Call API'

//	--------------------------------------------------
// 	A Redux middleware that interprets actions with CALL_API info specified.
// 	Performs the call and promises when such actions are dispatched.
//	--------------------------------------------------
export default store => next => action => {

  const callAPI = action[CALL_API]

  //console.log('call api with key: ', callAPI)

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { origPayload, schema, types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }

  // pending, fulfilled, rejected
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }

  // should be strings
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  // what is this doing?
  const actionWith = data => {

    //console.log('orig payload: ', origPayload)
    //console.log('new data: ', data)

    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  // execute the pending action
  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  // call the api
  return callApi(endpoint, schema).then(
    payload => next(actionWith({
      type: successType,
      payload: merge({}, origPayload, payload)
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}