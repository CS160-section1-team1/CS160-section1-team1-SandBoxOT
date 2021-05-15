const fetch = require('node-fetch');

function testUserGetById() {
	const user_id = 2;

	const URL = `https://api.sandboxot.link/user/${user_id}`;

	const params = {
		method: "GET",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type':'application/json'
		},
		mode: 'cors'
	};

	fetch(URL, params).then(res => {
		if(res && res.status == 200)
			console.log('Get By Id test Passed');
		else
			console.log('Get By Id test Failed');
	});
}

testUserGetById();

module.exports = {testUserGetById};
