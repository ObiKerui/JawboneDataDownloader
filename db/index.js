const config = require('../config');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); // optional, use this to get rid of 

const { DB_URL, USERS_DB_URL } = config

//----------------------------------------------------------------
// connect to the data base 
// (note: setting useMongoClient: true will cause model operations to hang!)
//----------------------------------------------------------------
//mongoose.connect(DB_URL);
//const db = mongoose.connection;

const db = mongoose.createConnection(DB_URL)
const userdb = mongoose.createConnection(USERS_DB_URL)

//----------------------------------------------------------------
// log the ocurrence of an error
//----------------------------------------------------------------
db.on('error', console.error.bind(console, 'db connection error:'))
userdb.on('error', console.error.bind(console, 'userdb connection error:'))

//----------------------------------------------------------------
// log the ocurrence of open
//----------------------------------------------------------------
db.on('open', () => {
  console.log('db open');
})

userdb.on('open', () => {
  console.log('userdb open');
})

//----------------------------------------------------------------
// log the ocurrence of disconnect
//----------------------------------------------------------------
db.on('disconnected', () => {
	console.log('db disconnected');
})

userdb.on('disconnected', () => {
	console.log('userdb disconnected');
})

//----------------------------------------------------------------
// disconnect if app terminated
//----------------------------------------------------------------
process.on('SIGINT', () => {  
  db.close(() => { 
    console.log('db connection disconnected through app termination')
	userdb.close(() => {
		console.log('userdb connection disconnected through app termination')  	
		process.exit(0)
	})
  })
})

//----------------------------------------------------------------
// export the connections
//----------------------------------------------------------------
module.exports = {
	db,
	userdb
}