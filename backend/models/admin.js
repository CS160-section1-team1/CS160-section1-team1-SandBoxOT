/* Keven Lam */
const dbUtils = require('../utils/dbUtils');

function login(req, res) {

    let name = req.body.name;
    let password = req.body.password;
    let sql = 'SELECT * FROM Admin WHERE name = ? AND password = ?';

    dbUtils.query(sql, [name, password])
    .then (result => {

        if(result.length < 1) throw new Error('No such Admin!');

        console.log("Admin Authorized!");

        res.json({
            name: name
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Auth Failed'});
    });
}

function getAllUsers(req, res) {
    const sql = 'SELECT user_id, first_name, last_name, email FROM User';

    dbUtils.query(sql, [])
    .then(results => {

        res.json({
            usersList: results
        })
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Failed to Get All Users'});
    });
}

function getAllEvents(req, res) {
    const sql = 'SELECT event_id, name, service_provider_id FROM Event_View';

    dbUtils.query(sql, [])
    .then(results => {

        res.json({
            eventsList: results
        })
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Failed to Get All Events'});
    });
}

module.exports = {
    login,
    getAllUsers,
    getAllEvents
};