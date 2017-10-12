
//------------------------------------------------------
// UTIL - initialise JAWBONE UP
//------------------------------------------------------
const init = params => {

	const { token, clientId, secret } = params

	console.log('params to jawbone: ', params)

	if(!token || !clientId || !secret) {
		return null
	}

	const options = {	
		access_token: token,
		client_id: clientId,
		client_secret: secret
	}

	const up = require('jawbone-up')(options);
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
		cb(null)
	} else {		
		console.log('result retrieved: ', result)

		try {
			const parsed = JSON.parse(result)
			if(badStatus(parsed)) {
				return cb(null)
			}
			cb(parsed.data)
		} catch(e) {
			cb(null)
		}
	}
}

//------------------------------------------------------
// RETRIEVE THE PROFILE 
//------------------------------------------------------
const profile = (params, cb) => {

	const up = init(params)

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
var sleeps = function(params, cb) {
	
	const up = init(params);

	if(!up) {
		return cb('error - not a valid user')
	}

	up.sleeps.get({ limit : 1000 }, (err, sleeps) => {
		handleResponse(err, sleeps, (parsedSleepData) => {
			console.log('retrieved parsed sleep data: ', parsedSleepData)
			cb(parsedSleepData)
		})
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
