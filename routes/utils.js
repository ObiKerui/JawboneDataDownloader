

//------------------------------------------------------------------------
// RETRIEVE THE CURRENTLY LOGGED IN USER
//------------------------------------------------------------------------
const getLoggedInUser = (req, res) => {

  	const user = {
  		createdAt: Date.now(),
	    image: null,
	    profile: {
		    last: 'test',
		    first: 'first'	    	
	    },
	    jawboneData: {
	      jawboneId : 'some id',
	      access_token : 'some token',
	      refresh_token : 'some refresh token'
	    }
	}  

	// TODO take this out after development
	if(!res.locals.user) {
		return user
	} else {
		return res.locals.user
	}
}

//------------------------------------------------------------------------
// HANDLE RESPONSE
//------------------------------------------------------------------------
const handleResponse = (err, result, res) => {
	if(err) {
		res.status(500).json(err)
	} else {
		res.status(200).json(result)
	}
}

//------------------------------------------------------------------------
// EXPORTS
//------------------------------------------------------------------------
module.exports = {
	getLoggedInUser,
	handleResponse
}