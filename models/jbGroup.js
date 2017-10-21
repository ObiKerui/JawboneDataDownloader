const { db, userdb } = require('../db')
const User = require('./user')
const moment = require('moment')
const mongoose = require('mongoose')
const union = require('lodash/union')
const Schema = mongoose.Schema

//------------------------------------------------------
//  DEFINE GROUP MEMBER SCHEMA
//------------------------------------------------------
const jbGroupMemberSchema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: 'jbGroup' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  role: {
    type: String,
    enum : ['USER','ADMIN'],
    default: 'USER'
  }
}, {
  timestamps: true
})

//------------------------------------------------------
//  DEFINE GROUP SCHEMA
//------------------------------------------------------
const jbGroupSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true, minlength: 0, maxlength: 40 },
  description: { type: String, required: false, minlength: 0, maxlength: 200 },
  creationDate: { type: Date, required: true, default: moment().format() },
  type: { type: String, default: 'regular' },
  members: [ { type: Schema.Types.ObjectId, ref: 'jbGroupMemberSchema' } ],
  admins: [ { type: Schema.Types.ObjectId, ref: 'jbGroupMemberSchema' } ],  
  photo: { data: Buffer, contentType: String, required: false },
  permissions: {
    canDelete : { type: Boolean, default: false },
    canEdit : { type: Boolean, default: false }
  }
}, {
  timestamps: true
})

//------------------------------------------------------
//  DEFINE GROUP OBJECT MODEL
//------------------------------------------------------
const Group = db.model('jbGroup', jbGroupSchema);
const GroupMember = db.model('jbGroupMember', jbGroupMemberSchema);

//------------------------------------------------------
//  UTIL - HANDLE RESPONSE
//------------------------------------------------------
const handleReponse = (err, result, cb) => {
  if(err) {
    console.log('error in group action: ', err)
    cb(null)
  } else {
    cb(result)
  }
}

//------------------------------------------------------
//  GET THE DEFAULT GROUP IF IT EXISTS
//------------------------------------------------------
const createDefaultGroup = (cb) => {

  const defaultGroup = new Group({
    name: 'All Users',
    description: 'Created and joined by default',
    type: 'default'
  })

  defaultGroup.save((err, createdDefaultGroup) => {
    handleReponse(err, createdDefaultGroup, cb)
  })
}

//------------------------------------------------------
//  GET THE DEFAULT GROUP IF IT EXISTS
//------------------------------------------------------
const getDefaultGroup = (cb) => {
  Group.findOne({ type: 'default'}, (err, defGroup) => {
    handleReponse(err, defGroup, cb)
  })
}

//------------------------------------------------------
//  GET GROUP IF IT EXISTS
//------------------------------------------------------
const get = (filter, cb) => {
  Group.find(filter, (err, group) => {
    handleReponse(err, group, cb)
  })
}

//------------------------------------------------------
//  GET GROUP MEMBERS OF GROUP
//------------------------------------------------------
const getMembers = (id, cb) => {
  GroupMember.find({ group: id }, (err, groupMembers) => {
    handleReponse(err, groupMembers, cb)
  })
}

//------------------------------------------------------
//  REMOVE A GROUP MEMBER
//------------------------------------------------------
const removeGroupMemberByGroup = (filter, cb) => {

  const { group } = filter

  GroupMember.remove({ group: group }, (err) => {
    handleReponse(err, 'ok', cb)
  })
}

//------------------------------------------------------
//  REMOVE A GROUP
//------------------------------------------------------
const remove = (filter, cb) => {

  // for now just remove all gropus and all group members
  GroupMember.remove({}, (err, result) => {
    Group.remove({}, (err, remGroup) => {
      handleReponse(err, remGroup, cb)
    })
  })

  // todo implement this properly
  // Group.findOne(filter, (err, result) => {
  //   handleReponse(err, result, (arg) => {
  //     removeGroupMemberByGroup(arg, () => {
  //       Group.remove(filter, (err) => {
  //         handleReponse(err, 'ok', cb)
  //       })          
  //     })
  //   })
  // })
}

//------------------------------------------------------
//  REMOVE A GROUP MEMBER
//------------------------------------------------------
const removeMembers = (filter, cb) => {
  GroupMember.remove(filter, (err) => {
    handleReponse(err, 'ok', cb)
  })
}

//------------------------------------------------------
//  UPDATE GROUP WITH NEW MEMBER
//------------------------------------------------------
const addMemberWithGroup = (params, cb) => {
  const { group, user } = params

    Group.findByIdAndUpdate(
      group._id, 
      { $addToSet: { members: { user : user._id }}}, 
      { safe: true, upsert: true, new: true}, 
    (err, result) => {
      handleReponse(err, result, cb)
    }
  )
}

//------------------------------------------------------
//  ADD MEMBER TO A GROUP
//------------------------------------------------------
const addMember = (params, cb) => {

  const { group, user, addedBy, role } = params

  const query = {
    group: group,
    user: user
  }

  const groupMember = {
    group: group,
    user: user,
    addedBy: addedBy,
    role: role
  }

  GroupMember.findOneAndUpdate(query, groupMember, { upsert:true }, (err, newGroupMember) => {
    //console.log('new group member created: ', newGroupMember)
    handleReponse(err, newGroupMember, (result) => {
      if(result) {
        //addMemberWithGroup(params, newGroupMember, cb)
        cb(result)
      } else {
        cb(null)
      }
    })
  })
}

//------------------------------------------------------
//  MODULE EXPORTS
//------------------------------------------------------
module.exports = {
  createDefaultGroup,
  get,
  getDefaultGroup,
  getMembers,
  remove
}