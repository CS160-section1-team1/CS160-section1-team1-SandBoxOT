const fetch = require('node-fetch');
const {testGetBalance} = require('./getBalanceTest.js');
const {testWithdraw} = require('./withdrawTest.js');

async function unitTestWithdraw() {
	testGetBalance(2).then( balance_pre_withdraw => {
		testWithdraw(2, 1.00).then( () => {
			testGetBalance(2).then( balance_post_withdraw => {
				if(Math.abs((balance_pre_withdraw - 1.0) - balance_post_withdraw) > 0.0000009) {
					console.log('Withdraw unit test failed');
				}
				else {
					console.log('Withdraw unit test passed');
				}
			});
		});
	});
}

unitTestWithdraw();

module.exports = {unitTestWithdraw};
