const fetch = require('node-fetch');

function testLogin() {
	const date = Date.now();
	const user = {
		password: 'test123',
		email: 'johnDoe@test.com'
	};

	const URL = 'https://api.sandboxot.link/user/login';

	const params = {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type':'application/json'
		},
		mode: 'cors'
	};

	params.body = JSON.stringify(user);
	fetch(URL, params).then(res => {
		if(res && res.status == 200)
			console.log('Signin test Passed');
		else
			console.log('Signin test Failed');
	});
}

testLogin();
