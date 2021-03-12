const port = 3000;
const express = require('express');
const user_signup = require('./user_signup');

const app = express();
app.use(express.json());

// Create new resource
app.post('/user/signup', user_signup);

app.listen(port, () => console.log(`Listening to port ${port}...`));
