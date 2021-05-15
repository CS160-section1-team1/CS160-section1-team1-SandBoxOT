const fetch = require('node-fetch');

function testGetCardInfo() {
	const user_id = 2;

	const URL = `https://api.sandboxot.link/user/getCardInfo/${user_id}`;

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
			console.log('Get Card Info test Passed');
		else
			console.log('Get Card Info test Failed');
	});
}

testGetCardInfo();

module.exports = {testGetCardInfo};
