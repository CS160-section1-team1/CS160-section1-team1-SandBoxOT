const port = 3000;
const express = require('express');
const cors = require('cors');
const user_signup = require('./user_signup');
const user_signin = require('./user_signin');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
//app.use(express.static('static'));

//Create new resource
app.post('/signup', user_signup);
app.post('/signin', user_signin);

app.listen(port, () => console.log(`Listening to port ${port}...`));
