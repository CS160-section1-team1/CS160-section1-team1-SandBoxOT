const fetch = require('node-fetch');

const URL = 'http://mahdi.link/user/signup';
const Data = {
 	"first_name": "Test",
 	"last_name": "User",
	"password": "test123!",
 	"email": "test0123@yahoo.com"
};

const othePram = {
  headers: {
    'Accept': 'application/json',
    'Content-Type':'application/json'
  },
  mode: 'cors',
  body: JSON.stringify(Data),
  method: "POST"
};

fetch(URL, othePram)
.then(data => {return data.json()})
.then(res => {console.log(res)})
.catch(error => console.log(error));
