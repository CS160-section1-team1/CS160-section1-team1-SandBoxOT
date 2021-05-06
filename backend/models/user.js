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

        const user_id = result.insertId;

        sql = `INSERT INTO Balance (user_id) VALUES("${user_id}")`;
        dbUtils.query(sql, [])
        .then(result => {
            console.log(`Successfully created balance for user ${user_id}`);
        }).catch(err => {
            console.error(err);
            res.status(401).send({error: 'Balance creation Failed'});
            return;
        });

        res.json({
            user_id : user_id,
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

/* Adam Walker*/
function addCardInfo(req, res){
    let sql;
    const user = req.body;

    const date = user.expiration_date.split('/');

    sql = 'INSERT into Wallet (user_id, name, credit_card_num, expiration_date, csv)' +
    `VALUES("${user.user_id}", "${user.name}", "${user.credit_card_num}", "${date[1]}-${date[0]}-00","${user.csv}")`;

    dbUtils.query(sql, [])
    .then(result => {
        console.log('Credit card info uploaded!');

        sql = `SELECT * FROM Wallet WHERE user_id = ${user.user_id}`;
        dbUtils.query(sql, [])
        .then(result => {
            res.json(result);
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Card info upload Failed'});
    });
}

/*Adam Walker */
function deleteUser(res,req){
    let sql;
    const user_id = req.params.user_id;

    sql = `DELETE FROM User WHERE user_id = ${user_id}`;

    dbUtils.query(sql,[])
    .then(result =>{
        console.log('User successfully deleted');
        res.json({
            deleted: user_id
        });
    })
    .catch(err =>{
        console.error(err);
        res.status(401).send({error: 'Failed: Delete user'});
    });

}

/* Mahdi Khaliki*/
function getCardInfo(req, res){
    let sql;

    const user_id = req.params.id;
    sql = `SELECT * FROM Wallet WHERE user_id = ${user_id}`;
    dbUtils.query(sql, [])
    .then(result => {
        res.json(result);
    }).catch(err => {
        console.error(err);
        res.status(401).send({error: 'Get Card Info Failed'});
    });
}

/* Mahdi Khaliki*/
function getBalance(req, res){
    let sql;

    const user_id = req.params.id;
    console.log(user_id);
    sql = `SELECT balance FROM Balance WHERE user_id = ${user_id}`;
    dbUtils.query(sql, [])
    .then(result => {
        if(result.length == 0) {
            res.status(401).send({error: 'No wallet associated with user_id'});
            return;
        }
        res.json(result[0]);
    }).catch(err => {
        console.error(err);
        res.status(401).send({error: 'Get Card Info Failed'});
    });
}

/* Mahdi Khaliki*/
function deposit(req, res){
    let sql;
    const user = req.body;

    const user_id = user.user_id;
    const amount = user.amount;

    sql = `UPDATE Balance SET balance = balance + ${amount} WHERE user_id = ${user_id}`;

    dbUtils.query(sql, [])
    .then(result => {
        if(result.affectedRows == 0) {
            res.status(401).send({error: 'No balance associated with user_id'});
            return;
        }
        
        sql = `SELECT balance FROM Balance WHERE user_id = ${user_id}`;
        dbUtils.query(sql, [])
        .then(result => {
            res.json(result[0]);
        });
    }).catch(err => {
        console.error(err);
        res.status(401).send({error: 'Deposit Failed'});
    });
}

/* Mahdi Khaliki*/
function withdraw(req, res){
    let sql;
    const user = req.body;

    const user_id = user.user_id;
    const amount = user.amount;

    sql = `SELECT balance FROM Balance WHERE user_id = ${user_id}`;
    dbUtils.query(sql, [])
    .then(result => {
        const balance = result[0].balance;

        if(balance - amount < 0.0) {
            res.status(401).send({error: 'Insufficient Funds'});
        }
        else {
            sql = `UPDATE Balance SET balance = balance - ${amount} WHERE user_id = ${user_id}`;
            dbUtils.query(sql, [])
            .then(result => {
                res.json({balance: balance - amount});
            });
        }
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Withdraw Failed'});
    });
}

/* Mahdi Khaliki */
function deleteCard(req, res) {
    let sql;
    const wallet_id = req.params.wallet_id;

    sql = `DELETE FROM Wallet WHERE wallet_id = ${wallet_id}`;
    dbUtils.query(sql, [])
    .then(result => {
        res.json({deleted: wallet_id});
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Delete Failed'});
    });
}

module.exports = {login, signup, getById, addCardInfo, getCardInfo, getBalance, deposit, withdraw, deleteCard, deleteUser};
