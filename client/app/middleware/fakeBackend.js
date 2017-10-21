import v4 from 'uuid/v4'

const n = 6;
const ids = Array(n).fill(null).map(() => v4())

//console.log('ids: ', ids)

const fakeDatabase = {
	profile: {
		_id: ids[0],
		name: 'Craig Sharp',
		age: 40
	},
	users: [ {
		_id: ids[1],
		name: 'Joe Black',
		age: 35
	}, {
		_id: ids[2],
		name: 'Jane White',
		age: 30
	}, {
		_id: ids[3],
		name: 'Rebecca Grey',
		age: 20
	}],
	groups: [ {
		_id: ids[4],
		title: 'Default Group',
		subTitle: 'Default SubTitle',
		members: [ ids[0], ids[1], ids[2], ids[3] ],
		admins: []
	}, {
		_id: ids[5],
		title: 'Therapists',
		subTitle: 'Therapists Group',
		members: [ ids[3], ids[4], ids[5] ],
		admins: []
	}]
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const getProfile = () => fakeDatabase.profile
const getUsers = () => fakeDatabase.users
const getGroups = () => fakeDatabase.groups

const getData = (endpoint) => {

	//console.log('endpoint:', endpoint)

	switch(endpoint) {
		case 'profile':
			return getProfile()
		case 'groups':
			return getGroups()
		default: 
			//console.log('get the users')
			return getUsers()
	}
}

export default (endpoint, schema) => {
	//console.log('endpoint: ', endpoint)
	return delay(500).then(() => {
		//console.log('now return fake')
		return {
			status: 200,
			data: getData(endpoint)
		}
	})
}

