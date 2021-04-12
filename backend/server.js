const port = 3000;
const express = require('express');
const cors = require('cors');
const user_signup = require('./user_signup');
// const user_signin = require('./user_signin');
//const session = require('express-session');

const app = express();

// Register view engine -- Keven Lam
//app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(cors());
/* Keven Lam */
app.use(express.urlencoded({extended: true}));
//app.use(express.static('static'));
// app.use(session({
//     secret: 'secret-key',
//     resave: false,
//     saveUninitialized: false,
// }));

/* Keven Lam */
// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.get('/signup', (req, res) => {
//     res.render('signup');
// });

// app.get('/account', (req, res) => {
//     if (req.session.user_id) {
//         res.render('account', {
//             user_id: req.session.user_id,
//             first_name: req.session.first_name,
//             last_name: req.session.last_name,
//             email: req.session.email
//           });
//     } else {
//         res.render('index');
//     }
// });

//Create new resource
app.post('/signup', user_signup);
// app.post('/signin', user_signin);

// app.get('/', (req, res) => {
//     res.json({
//         name: 'test'
//     });
// });

app.listen(port, () => console.log(`Listening to port ${port}...`));
