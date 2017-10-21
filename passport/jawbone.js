const JawboneStrategy = require('passport-oauth').OAuth2Strategy;
const jawboneIds = require('../config')
const { jawbone, user } = require('../models')

//  ----------------------------------------------------------------
//  retrieve the jawbone user
//  ----------------------------------------------------------------
const retrieveJBProfile = (access_token, cb) => {

  //console.log('retrieve jawbone profile passport jawbone: ', params)

  const user = {
    jawboneData: {
      access_token: access_token
    }
  }

  jawbone.profile(user, (err, result) => {
    if(err) {
      cb(null)
    } else {
      cb(result)
    }
  })
}

//  ----------------------------------------------------------------
//  create a user to store in session
//  ----------------------------------------------------------------
const createUser = (profile, token, refreshToken) => {
  return {
    image: profile.image,
    last: profile.last,
    first: profile.first,
    jawboneData: {
      jawboneId : profile.xid,
      access_token : token,
      refresh_token : refreshToken
    }
  }  
}

//  ----------------------------------------------------------------
//  retrieve the jawbone user
//  ----------------------------------------------------------------
const retrieveSleeps = (user, cb) => {
  jawbone.sleeps(user, (sleeps) => {
    return cb(sleeps)
  })
}

//  ----------------------------------------------------------------
//  define how to configure passport
//  ----------------------------------------------------------------
const configurePassport = (passport, configIds) => {

  passport.use('jawbone', new JawboneStrategy({
    clientID: configIds.jawboneAuth.clientId,
    clientSecret: configIds.jawboneAuth.clientSecret,
    authorizationURL: configIds.jawboneAuth.authorizationURL,
    tokenURL: configIds.jawboneAuth.tokenURL,
    callbackURL: configIds.jawboneAuth.callbackURL,
    passReqToCallback: true
  }, (req, token, refreshToken, profile, done) => {

    retrieveJBProfile(token, (profile) => {
      if(profile) {
        const user = createUser(profile, token, refreshToken)
        done(null, user)        
      } else {
        done('error retrieving user profile from jawbone')
      }
    })
  }))
}

module.exports = (passport, configIds) => {
  return {
    configure: configurePassport(passport, configIds)
  }
}

//---------------------------------------------
//
//---------------------------------------------
// function createRoles(profileData, cb) {

//   var xid = profileData.data.xid;
//   var roles = ['ROLE_GUEST'];

//   //console.log('xid to create roles: ' + JSON.stringify(xid));

//   jawboneMgr.getIds(function(err, authUsers, authAdmins) {
//     if(err) {
//       console.log('error getting those xid to create roles: ' + JSON.stringify(err));
//       return cb(roles);
//     } else {
//       console.log('got those xid to create roles: %s %s', JSON.stringify(authUsers), JSON.stringify(authAdmins));

//       for(var i = 0; i < authUsers.length; i++) {
//         if(authUsers[i] === profileData.data.xid) {
//           roles.push('ROLE_USER');        
//         }
//       } 

//       for(var i = 0; i < authAdmins.length; i++) {
//         if(authAdmins[i] === profileData.data.xid) {
//           roles.push('ROLE_ADMIN');        
//         }
//       } 

//       return cb(roles);     
//     }
//   });
// }

/*
*   PASSPORT JAWBONE STRATEGY
*/
// module.exports = function(passport, configIds) {

//   passport.use('jawbone', new JawboneStrategy({
//     clientID: configIds.jawboneAuth.clientID,
//     clientSecret: configIds.jawboneAuth.clientSecret,
//     authorizationURL: configIds.jawboneAuth.authorizationURL,
//     tokenURL: configIds.jawboneAuth.tokenURL,
//     callbackURL: configIds.jawboneAuth.callbackURL,
//     passReqToCallback: true
//   }, function(req, token, refreshToken, profile, done) {

//     var options = {
//       access_token: token,
//       client_id: configIds.jawboneAuth.clientID,
//       client_secret: configIds.jawboneAuth.clientSecret
//     };

//     //up = require('jawbone-up')(options);
//     // req.user.jawboneData = req.user.jawboneData || {};
//     // req.user.jawboneData.access_token = token;
//     // req.user.jawboneData.refresh_token = refreshToken;

//     //console.log('Here or what? AUTHENTICATE WITH JAWBONE');

//     // get the user's jawbone profile - pain in the ass this was't returned in their profile above!
//     jawboneMgr.profile(options, function(profileErr, profileResult) {
//       if(profileErr) {
//         console.log('error getting the user profile: ' + profileErr);
//         return done(profileErr);
//       }

//       // create new jawbone credentials
//       var jawboneData = {
//         jawboneId : profileResult.data.xid,
//         access_token : token,
//         refresh_token : refreshToken
//       };

//       console.log('got the profile: ' + JSON.stringify(jawboneData.jawboneId));

//       createRoles(profileResult, function(roles) {
//         user.getByJawboneId(jawboneData.jawboneId, function(err, userResult) {
//           if(err) {
//             console.log('error retrieving user by jawbone id: ' + err);
//             return done(err);                      
//           } else if(!userResult) {  // create a new user

//             user.create(profileResult.data, jawboneData, roles, function(createErr, createdUser) {
//               if(createErr) {
//                 console.log('error creating user : ' + createErr);
//                 return done(createErr);
//               } else {
//                 req.user = createdUser;

//                 // add the user to the default group
//                 groups.addMemberToDefault(createdUser, function(err, result) {
//                   if(err) {
//                     console.log('error adding created user to default group: ' + err);
//                   } else {
//                     console.log('added created user to default group');
//                   }
//                   return done(null, createdUser);
//                 });
//               }
//             });            

//           } else { // user already existed

//             console.log('found this user: ' + JSON.stringify(userResult));
//             userResult.jawboneData = jawboneData;
//             userResult.roles = roles;
//             console.log('found this user: ' + JSON.stringify(userResult));

//             user.update(jawboneData.jawboneId, userResult, function(updatedErr, updatedUser) {
//               if(updatedErr) {
//                 return done(updatedErr);
//               } else {
//                 console.log('updated user to: ' + JSON.stringify(updatedUser));
//                 req.user = updatedUser;
//                 return done(null, updatedUser);              
//               }
//             });

//           }
//         }); // end get user
//       }); // end create roles

//       // get user by jawbone-id
//       // user.getByJawboneId(jawboneData.jawboneId, function(err, userResult) {
//       //   if(err) {
//       //     console.log('error retrieving user by jawbone id: ' + err);
//       //     return done(err);          
//       //   } else if(!userResult) {

//       //     console.log('the user is null - create one');
//       //     createRoles(profileResult, function(roles) {
//       //       user.create(profileResult.data, jawboneData, roles, function(createErr, createdUser) {
//       //         if(createErr) {
//       //           console.log('error creating user : ' + createErr);
//       //           return done(createErr);
//       //         } else {
//       //           req.user = createdUser;

//       //           // add the user to the default group
//       //           groups.addMemberToDefault(createdUser, function(err, result) {
//       //             if(err) {
//       //               console.log('error adding created user to default group: ' + err);
//       //             } else {
//       //               console.log('added created user to default group');
//       //             }
//       //             return done(null, createdUser);
//       //           });
//       //         }
//       //       });
//       //     });

//       //   } else {
//       //     // found user in db
//       //     console.log('found this user: ' + JSON.stringify(userResult));
//       //     userResult.jawboneData = jawboneData;

//       //     user.update(jawboneData.jawboneId, userResult, function(updatedErr, updatedUser) {
//       //       if(updatedErr) {
//       //         return done(updatedErr);
//       //       } else {
//       //         console.log('updated user to: ' + JSON.stringify(updatedUser));
//       //         req.user = updatedUser;
//       //         return done(null, updatedUser);              
//       //       }
//       //     });
//       //   }
//       // });

//       //console.log('got the user profile: ' + JSON.stringify(profileResult));
  
//       // fill in the profile fields
//       //req.user.jawboneData.jawboneId = profileResult.data.xid;
  
//       // we may not want to store these for privacy reasons
//       // req.user.profile = req.user.profile || {};
//       // req.user.profile.weight = profileResult.data.weight;
//       // req.user.profile.img = profileResult.data.image;
//       // req.user.profile.first = profileResult.data.first;
//       // req.user.profile.last = profileResult.data.last;
//       // req.user.profile.height = profileResult.data.height;
//       // req.user.profile.gender = profileResult.data.gender;

//       // update the user
//       // user.update(req.user.email, req.user, function(updateErr, result) {
//       //   if(updateErr) {
//       //     console.log('error updating user: ' + updateErr);
//       //     return done(updateErr);
//       //   } else {
//       //     console.log('updated user: ' + JSON.stringify(result));
//       //     return done(null, result);
//       //   }
//       // });
//     });
//   }));

//   // console.log('client id: ' + configIds.jawboneAuth.clientID);
//   // console.log('client secret: ' + configIds.jawboneAuth.clientSecret);
//   // console.log('auth url: ' + configIds.jawboneAuth.authorizationURL);
//   // console.log('token url: ' + configIds.jawboneAuth.tokenURL);
//   // console.log('cb url: ' + configIds.jawboneAuth.callbackURL);

// 	// passport.use('jawbone', new JawboneStrategy({
// 	//   clientID: configIds.jawboneAuth.clientID,
// 	//   clientSecret: configIds.jawboneAuth.clientSecret,
// 	//   authorizationURL: configIds.jawboneAuth.authorizationURL,
// 	//   tokenURL: configIds.jawboneAuth.tokenURL,
// 	//   callbackURL: configIds.jawboneAuth.callbackURL,
//  //    passReqToCallback: true
// 	// }, function(req, token, refreshToken, profile, done) {

// 	//   var options = {
// 	//     access_token: token,
// 	//     client_id: configIds.jawboneAuth.clientID,
// 	//     client_secret: configIds.jawboneAuth.clientSecret
// 	//   };

// 	//   //up = require('jawbone-up')(options);
//  //    req.user.jawboneData = req.user.jawboneData || {};
//  //    req.user.jawboneData.access_token = token;
//  //    req.user.jawboneData.refresh_token = refreshToken;

//  //    console.log('Here or what? AUTHENTICATE WITH JAWBONE');

//  //    // get the user's jawbone profile - pain in the ass this was't returned in their profile above!
//  //    jawboneMgr.profile(req.user, function(profileErr, profileResult) {
//  //      if(profileErr) {
//  //        console.log('error getting the user profile: ' + profileErr);
//  //        return done(profileErr);
//  //      }

//  //      //console.log('got the user profile: ' + JSON.stringify(profileResult));
  
//  //      // fill in the profile fields
//  //      req.user.jawboneData.jawboneId = profileResult.data.xid;
  
//  //      // we may not want to store these for privacy reasons
//  //      req.user.profile = req.user.profile || {};
//  //      req.user.profile.weight = profileResult.data.weight;
//  //      req.user.profile.img = profileResult.data.image;
//  //      req.user.profile.first = profileResult.data.first;
//  //      req.user.profile.last = profileResult.data.last;
//  //      req.user.profile.height = profileResult.data.height;
//  //      req.user.profile.gender = profileResult.data.gender;

//  //      // update the user
//  //      user.update(req.user.email, req.user, function(updateErr, result) {
//  //        if(updateErr) {
//  //          console.log('error updating user: ' + updateErr);
//  //          return done(updateErr);
//  //        } else {
//  //          console.log('updated user: ' + JSON.stringify(result));
//  //          return done(null, result);
//  //        }
//  //      });
//  //    });
// 	// }));
// }
