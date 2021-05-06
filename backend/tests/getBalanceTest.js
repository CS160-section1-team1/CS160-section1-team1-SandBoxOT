const fetch = require('node-fetch');

async function testGetBalance(user_id=2) {
	const URL = `https://api.sandboxot.link/user/getBalance/${user_id}`;

	const params = {
		method: "GET",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type':'application/json'
		},
		mode: 'cors'
	};

	const balance = await fetch(URL, params).then(res => {
		if(res && res.status == 200) {
			console.log('Get Balance test Passed');
			return res.json();
		}
		else {
			console.log('Get Balance test Failed');
			return null;
		}
	});

	return balance ? balance.balance : null;
}

module.exports = {testGetBalance};
