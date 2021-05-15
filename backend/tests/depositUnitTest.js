const fetch = require('node-fetch');
const {testGetBalance} = require('./getBalanceTest.js');
const {testDeposit} = require('./depositTest.js');

function unitTestDeposit() {
	testGetBalance(2).then( balance_pre_deposit => {
		testDeposit(2, 1.00).then( () => {
			testGetBalance(2).then( balance_post_deposit => {
				if(Math.abs((balance_pre_deposit + 1.0) - balance_post_deposit) > 0.0000009) {
					console.log('Deposit unit test failed');
				}
				else {
					console.log('Deposit unit test passed');
				}
			});
		});
	});
}

unitTestDeposit();

module.exports = {unitTestDeposit};