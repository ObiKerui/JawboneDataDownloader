const { db, userdb } = require('../db')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//------------------------------------------------------
//  DEFINE JAWBONE DATA SCHEMA
//------------------------------------------------------
const jawboneDataSchema = new Schema({
  jawboneId : { type: String, required: false, unique: false },
  access_token : { type: String, required: false },
  refresh_token : { type: String, required: false }
})

//------------------------------------------------------
//  DEFINE USER STATS SCHEMA
//------------------------------------------------------
const statsSchema = new Schema({
  nbrGroups: { type: Number, required: false },
  nbrPatients: { type: Number, required: false }  
})

//------------------------------------------------------
//  DEFINE USER PROFILE SCHEMA
//------------------------------------------------------
const profileSchema = new Schema({
  img: { data: Buffer, contentType: String, required: false },
  first: { type: String, required: false },
  last: { type: String, required: false },
  weight: { type: String, required: false },
  height: { type: String, required: false },   
  gender: { type: String, required: false }, 
  phone: { type: String, required: false }, 
  dateOfBirth: { type: Date, required: false },
  bio: { type: String, required: false },
  homepage: { type: String, required: false },
  timezone: { type: String, required: false },
  country: { type: String, required: false }    
});

//------------------------------------------------------
//  DEFINE USER SCHEMA
//------------------------------------------------------
const user = new Schema({
  roles: [{ type: String, required: true }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'JbGroup' }],
  jawboneData : jawboneDataSchema,
  stats : statsSchema,
  profile: profileSchema
}, {
  timestamps: true
})

//------------------------------------------------------
//  DEFINE USER OBJECT MODEL
//------------------------------------------------------
const User = userdb.model('User', user)

//------------------------------------------------------
//  Util - handle response 
//------------------------------------------------------
const handleResponse = (err, result, cb) => {
  if(err) {
    cb(err)
  } else {
    cb(null, result)
  }
}

const getIdField = () => {
  return 'jawboneData.jawboneId'
}

//------------------------------------------------------
//  GET ALL USERS
//------------------------------------------------------
const get = (filter, cb) => {
  User.find(filter, (err, result) => {
    handleResponse(err, result, cb)
  })
}

// const get = (filter, cb) => {
//   const q = User.find({}).lean();
//   const tq = User.count();

//   q.exec((err, users) => {
//     if(err) {
//       console.log('error with query: ', err);
//       return cb(null);
//     }

//     tq.exec((err, count) => {
//       cb({
//         total: count,
//         max: count,
//         offset: 0,
//         sortBy: undefined,
//         data: users
//       });
//     })
//   })
// }

module.exports = {
  getIdField,
  get
}