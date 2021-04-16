const port = 3000;
const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const user_signup = require('./user_signup');
const user_signin = require('./user_signin');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
//app.use(express.static('static'));

app.get('/', (request, response) => {
  response.send('Secure server');
});

//Create new resource
app.post('/signup', user_signup);
app.post('/signin', user_signin);

app.listen(port, () => console.log(`Listening to port ${port}...`));

const sslServer = https.createServer( {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app);

sslServer.listen(port, () => console.log(`Secure server on port ${port}`));
