const fetch = require('node-fetch');

function testWithdraw(user_id=2, amount=1.00) {
	const body = {
		user_id: user_id,
		amount: amount
	}

	const URL = 'https://api.sandboxot.link/user/withdraw';

	const params = {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type':'application/json'
		},
		mode: 'cors'
	};

	params.body = JSON.stringify(body);
	fetch(URL, params).then(res => {
		if(res && res.status == 200)
			console.log('Withdraw test Passed');
		else
			console.log('Withdraw test Failed');
	});
}

module.exports = {testWithdraw};
