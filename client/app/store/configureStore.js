// import { applyMiddleware, combineReducers, createStore } from 'redux'
// import { createLogger } from 'redux-logger'
// import thunk from 'redux-thunk'
// import promise from 'redux-promise-middleware'

if (process.env.NODE_ENV === 'production') {
  	module.exports = require('./configureStore.prod')
} else {
  	module.exports = require('./configureStore.dev')
}
// const middleware = applyMiddleware(promise(), thunk, createLogger());
// export default createStore(reducer, middleware);

