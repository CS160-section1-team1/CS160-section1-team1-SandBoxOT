const port = 3000;
const express = require('express');
const user_signup = require('./user_signup');
const user_signin = require('./user_signin');

const app = express();
app.use(express.json());

// Create new resource
app.post('/user/signup', user_signup);
app.post('/user/signin', user_signin);

app.listen(port, () => console.log(`Listening to port ${port}...`));
