const bcrypt = require('bcrypt');
const dbUtils = require('../utils/dbUtils');

/* Adam Walker*/
function login(req, res) {

    let email = req.body.email;
    let password = req.body.password;

    // Query database
    dbUtils.query('SELECT * FROM User WHERE email = ?', [email])
    .then (result => {

        // If bad result, throw the Error. All thrown errors handled by .catch
        if(result.length < 1) throw new Error('No such email!');

        // compare password entered to password in database
        let compare = bcrypt.compareSync(password, result[0].password);

        if(!compare) throw new Error('Wrong password!');

        // login succeeded, send user info
        console.log("Login successful!");
        res.json({
            user_id: result[0].id,
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Auth Failed'});
    });
}

/* Mahdi Khaliki */
function signup(req, res) {
    const saltRounds = 10;
    let sql;
    const user = req.body;

    const hashed_password = bcrypt.hashSync(user.password, saltRounds);
    if('organization' in user) {
        sql = 'INSERT INTO Service_Provider (first_name, last_name, organization, password, email) '+
                `VALUES("${user.first_name}", "${user.last_name}", "${user.organization}", "${hashed_password}", "${user.email}")`;
    }
    else {
        sql = 'INSERT INTO User (first_name, last_name, password, email) '+
                `VALUES("${user.first_name}", "${user.last_name}", "${hashed_password}", "${user.email}")`;
    }

    dbUtils.query(sql, [])
    .then(result => {

        console.log('User successfully signed up!');
        res.json({
            user_id : result.insertId,
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Sign Up Failed'});
    });
}

function getById(req, res) {

    dbUtils.queryById('User', req.params.id)
    .then(result => {
        res.json({
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            email: result[0].email
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Could not receive user'});
    });
}

module.exports = {login, signup, getById};
