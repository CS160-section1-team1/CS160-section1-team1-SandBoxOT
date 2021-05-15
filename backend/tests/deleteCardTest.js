const fetch = require('node-fetch');

async function testDeleteCard() {
	// Find a wallet_id to delete
	const user_id = 2;
	const getCardURL = `https://api.sandboxot.link/user/getCardInfo/${user_id}`;
	const getCardparams = {
		method: "GET",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type':'application/json'
		},
		mode: 'cors'
	};

	const wallet = await fetch(getCardURL, getCardparams).then(res => {
		return res.json();
	});

	if(wallet.length < 1) {
		console.log('user does not have any cards to delete. Aborting test');
		return;
	}

	// Use the first wallet instance to delete from user
	const wallet_id = wallet[0].wallet_id;

	const body = {
		user_id: 2,
		amount: 1.00
	}

	const URL = `https://api.sandboxot.link/user/deleteCard/${wallet_id}`;

	const params = {
		method: "DELETE",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type':'application/json'
		},
		mode: 'cors'
	};

	fetch(URL, params).then(res => {
		if(res && res.status == 200)
			console.log('Delete Card test Passed');
		else
			console.log('Delete Card Failed');
	});
}

testDeleteCard();

module.exports = {testDeleteCard};
