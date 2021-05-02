const bcrypt = require('bcrypt');
const dbUtils = require('../utils/dbUtils');

/* Adam Walker*/
function login(req, res) {

    let email = req.body.email;
    let password = req.body.password;
    let sql = 'SELECT * FROM ' + 
        'User LEFT OUTER JOIN Service_Provider ' + 
        'ON User.user_id = Service_Provider.service_provider_id ' +
        'WHERE email = ?';

    // Query database
    dbUtils.query(sql, [email])
    .then (result => {

        // If bad result, throw the Error. All thrown errors handled by .catch
        if(result.length < 1) throw new Error('No such email!');
        
        // compare password entered to password in database
        let compare = bcrypt.compareSync(password, result[0].password);
            
        if(!compare) throw new Error('Wrong password!');
        
        // login succeeded, send user info
        console.log("Login successful!"); 

        const resId = (result[0].organization) ? 
            {servicer_id: result[0].user_id} : {user_id: result[0].user_id};

        res.json(resId);
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Auth Failed'});
    });
}

/* Mahdi Khaliki */
function signin (req, res) {
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

function addCardInfo(res,req){
    const salt = 10;
    let sql;
    const user = req.body;

    const hashed_cardNum = bcrypt.hashSync(user.credit_card_num, salt);

    sql = 'INSERT into Wallet (credit_card_num, expiration_date, csv)' +
    `VALUES("${hashed_cardNum}", "${user.exipration_date}","${user.csv}")`;

    dbUtils.query(sql, [])
    .then(result => {
        
        console.log('Credit card info uploaded!');
        res.json({
            user_id : result.id
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Card info upload Failed'});
    });
}

module.exports = {login, signin, getById, addCardInfo};