const fetch = require('node-fetch');

async function testDeposit(user_id=2, amount=1.00) {
	const body = {
		user_id: user_id,
		amount: amount
	}

	const URL = `https://api.sandboxot.link/user/deposit`;

	const params = {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type':'application/json'
		},
		mode: 'cors'
	};

	params.body = JSON.stringify(body);
	await fetch(URL, params).then(res => {
		if(res && res.status == 200)
			console.log('Deposit test Passed');
		else
			console.log('Deposit test Failed');
	});
}

testDeposit();

module.exports = {testDeposit};
