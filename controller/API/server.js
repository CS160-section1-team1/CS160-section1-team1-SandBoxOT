const port = 3000;
const express = require('express');
const cors = require('cors');
const user_signup = require('./user_signup');
const user_signin = require('./user_signin');

// Register view engine -- Keven Lam
app.set('view engine', 'ejs');

const app = express();
app.use(express.json());
app.use(cors());

/* Keven Lam */


// Create new resource
app.post('/user/signup', user_signup);
app.post('/user/signin', user_signin);

app.listen(port, () => console.log(`Listening to port ${port}...`));
