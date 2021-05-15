const fetch = require('node-fetch');

function testSignup() {
	const date = Date.now();
	const newUser = {
		first_name: `John ${date}`,
		last_name: 'Doe',
		password: 'test123',
		email: `johnDoe-${date}@example.com`
	};

	const URL = 'https://api.sandboxot.link/user/signup';

	const params = {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type':'application/json'
		},
		mode: 'cors'
	};

	params.body = JSON.stringify(newUser);
	fetch(URL, params).then(res => {
		if(res && res.status == 200)
			console.log('Signup test Passed');
		else
			console.log('Signup test Failed');
	});
}

testSignup();

module.exports = {testSignup};

