const dbUtils = require('../utils/dbUtils');
const bcrypt = require('bcrypt');

/* Keven Lam */
function signup (req, res) {
    const saltRounds = 10;
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds)
    };
    let id = null;

    dbUtils.insert('User', user)
    .then(result => {
        id = result.insertId;
        const servicer = {
            service_provider_id: id,
            organization: req.body.organization
        }
        return dbUtils.insert('Service_Provider', servicer);
    })
    .then(result => {
        console.log('Service Provider successfully signed up!');
        res.json({
            servicer_id: id,
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Sign Up Failed'});
    });
}

function getById(req, res) {

    const sql = 'SELECT * FROM ' + 
        'User INNER JOIN Service_Provider ' + 
        'ON User.user_id = Service_Provider.service_provider_id ' + 
        'WHERE User.user_id = ?';

    dbUtils.query(sql, [req.params.id])
    .then(result => {
        res.json({
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            email: result[0].email,
            organization: result[0].organization
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Could not receive service provider'});
    });
}

module.exports = {signup, getById};