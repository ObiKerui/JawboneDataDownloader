const { ids } = require('../config')

//------------------------------------------------------
// UTIL - initialise JAWBONE UP
//------------------------------------------------------
const init = user => {

	const { jawboneAuth } = ids
	const { clientId, clientSecret } = jawboneAuth
	const { jawboneData } = user
	const { access_token } = jawboneData

	console.log('user: ', user)
	console.log('clientId: ', clientId)
	console.log('secret: ', clientSecret)
	console.log('token: ', access_token)

	if(!access_token || !clientId || !clientSecret) {
		return null
	}

	const options = {	
		access_token: access_token,
		client_id: clientId,
		client_secret: clientSecret
	}

	const up = require('jawbone-up')(options);

	console.log('up is : ', up)

	return up;
}

//------------------------------------------------------
// UTIL - check for bad message status
//------------------------------------------------------
const badStatus = (result) => {
	const { code } = result.meta
	return (parseInt(code) !== 200)
}

//------------------------------------------------------
// UTIL - generic response handler
//------------------------------------------------------
const handleResponse = (err, result, cb) => {

	if(err) {
		console.log('error occured: ', err)
		cb(err)
	} else {		
		console.log('result retrieved: ', result)

		try {
			const parsed = JSON.parse(result)
			if(badStatus(parsed)) {
				return cb('error status ')
			}

			console.log('parsed data: ', parsed)

			cb(null, parsed.data)
		} catch(e) {
			cb('error parsing data')
		}
	}
}

//------------------------------------------------------
// RETRIEVE THE PROFILE 
//------------------------------------------------------
const profile = (user, cb) => {

	const up = init(user)

	if(!up) {
		return cb('error - not a valid user')
	}

	up.me.get({}, (err, profile) => {
		handleResponse(err, profile, cb)
	})
}

//------------------------------------------------------
// RETRIEVE THE SLEEPS 
//------------------------------------------------------
const sleeps = (user, cb) => {
	
	const up = init(user);

	if(!up) {
		return cb('error - not a valid user')
	}

	up.sleeps.get({ limit : 1000 }, (err, sleeps) => {
		handleResponse(err, sleeps, cb)
	})
}

//------------------------------------------------------
// RETRIEVE THE SLEEP TICKS 
//------------------------------------------------------
var sleepTicks = function(user, sleepId, cb) {
	if(!validUser(user)) {
		console.log('invalid user: ' + JSON.stringify(user));
		return cb('invalid user');
	} 

	var up = init(user);

	//console.log('getting the sleep ticks: ' + sleepId);

	up.sleeps.ticks({ xid : sleepId }, function(err, sleep) {
		//console.log('do we get here even?');
		if(err) {
			console.log('err retrieving sleeps: ' + err);
			cb(err);
		} else {
			//console.log('the retrieved sleep: ' + sleep)
			try {
				var jsonSleep = JSON.parse(sleep);
				//console.log('result of sleep tick request: ' + JSON.stringify(jsonSleep, true, 3));

	  			result = {
			      data: jsonSleep
			    };

			    cb(null, result);		
			} catch(e) {
				cb('error parsing jawbone results');
			}
		}
	});
}

//------------------------------------------------------
// RETRIEVE THE SLEEP DETAIL 
//------------------------------------------------------
var sleepDetails = function(user, sleepId, cb) {
	if(!validUser(user)) {
		console.log('invalid user: ' + JSON.stringify(user));
		return cb('invalid user');
	} 

	var up = init(user);

	//console.log('getting the sleep ticks: ' + sleepId);

	up.sleeps.get({ xid : sleepId }, function(err, sleep) {
		//console.log('do we get here even?');
		if(err) {
			console.log('err retrieving sleeps: ' + err);
			cb(err);
		} else {
			//console.log('the retrieved sleep: ' + sleep)
			try {
				var jsonSleep = JSON.parse(sleep);
				//console.log('result of sleep tick request: ' + JSON.stringify(jsonSleep, true, 3));

	  			result = {
			      data: jsonSleep
			    };

			    cb(null, result);		
			} catch(e) {
				cb('error parsing jawbone results');
			}
		}
	});
}

//------------------------------------------------------
// RETRIEVE THE MOVES 
//------------------------------------------------------
var moves = function(user, params, cb) {
	if(!validUser(user)) {
		console.log('invalid user: ' + JSON.stringify(user));
		return cb('invalid user');
	} 

	var up = init(user);

	console.log('moves: ' + JSON.stringify(up, true, 1));

	up.moves.get({ limit : 1000 }, function(err, moves) {
		if(err) {
			console.log('err retrieving moves: ' + err);
			cb(err);
		} else {
			try {
				var jsonMoves = JSON.parse(moves);

				//console.log('result of sleeps request (jsonSleeps): ' + JSON.stringify(jsonSleeps, true, 3));
				//console.log('>>>> sleeps access token : ' + JSON.stringify(user.jawboneData.access_token));

				console.log('params: ' + JSON.stringify(params));
				var total = jsonMoves.data.items.length;
				console.log('call paginate with total: ' + JSON.stringify(total));
				var paginatedData = paginate(jsonMoves.data.items, params.max, params.offset, total);
				
	  			result = {
			      total: jsonMoves.data.items.length,
			      max: params.max,
			      offset: params.offset,
			      sortBy: params.sortBy,
			      data: paginatedData
			    };

				//console.log('result of sleeps request (result): ' + JSON.stringify(result, true, 3));

			    cb(null, result);		
			} catch(e) {
				cb('error parsing jawbone results');
			}

		}
	});

};
module.exports = {
	profile,
	sleeps
}
