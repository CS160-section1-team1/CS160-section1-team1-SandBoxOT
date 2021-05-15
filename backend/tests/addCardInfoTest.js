const fetch = require('node-fetch');

function testAddCardInfo() {
	const card = {
		user_id: 2,
	    name: 'John Doe',
	    credit_card_num: '4444333322221111',
	    expiration_date: '01/1970',
	    cvv: 123
	}

	const URL = 'https://api.sandboxot.link/user/addCardInfo';

	const params = {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type':'application/json'
		},
		mode: 'cors'
	};

	params.body = JSON.stringify(card);
	fetch(URL, params).then(res => {
		if(res && res.status == 200)
			console.log('Add Card Info test Passed');
		else
			console.log('Add Card Info test Failed');
	});
}

testAddCardInfo();

module.exports = {testAddCardInfo};
