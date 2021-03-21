const port = 3000;
const express = require('express');
const cors = require('cors');
const user_signup = require('./user_signup');
const user_signin = require('./user_signin');
const session = require('express-session');

const app = express();

// Register view engine -- Keven Lam
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(cors());
/* Keven Lam */
app.use(express.static('static'));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}));

/* Keven Lam */
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/user/signup', (req, res) => {
    res.render('signup');
});

app.get('/user/account', (req, res) => {
    if (req.session.user_id) {
        res.render('account', {
            user_id: request.session.user_id,
            first_name: request.session.first_name,
            last_name: request.session.last_name,
            email: request.session.email
          });
    } else {
        res.render('index');
    }
});

// Create new resource
app.post('/user/signup', user_signup);
app.post('/user/signin', user_signin);

app.listen(port, () => console.log(`Listening to port ${port}...`));
