/* Keven Lam */
const dbUtils = require('../utils/dbUtils');

function search(req, res) {

    const sql = 'SELECT Events.id, Events.name, Events.description, Events.date, ' + 
        'Address.street, Address.city, Address.state, Address.zip ' +
        'FROM (Events JOIN Address ON Address.id = Events.address_id) ' +
        'WHERE Events.name LIKE ?';

    dbUtils.query(sql, [`%${req.body.search}%`])
    .then(results => {

        console.log('Search Succussful!');
        res.json({
            searchResults: results
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Search Failed!'});
    })
}

function listCitizenEvents(req, res) {

    const sql = 'SELECT Events.id, Events.name, Events.description, Events.date, ' + 
        'Address.street, Address.city, Address.state, Address.zip ' +
        'FROM (Events JOIN Address ON Address.id = Events.address_id) ' +
        'WHERE Events.id IN (SELECT event_id FROM User_Event WHERE user_id = ?)';

    dbUtils.query(sql, [req.params.id])
    .then(results => {

        console.log('Citizen Event List Successful!');
        res.json({
            eventList: results
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Citizen Event List Failed!'});
    })
}

function register(req, res) {
    
    const sql = 'INSERT INTO User_Event VALUES (?, ?)';

    dbUtils.query(sql, [req.body.user_id, req.body.event_id])
    .then(results => {

        console.log('Event Registration Succuessful!');
        console.log(results);
        res.json({
            redirect: 'account.html'
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Event Registration Failed!'});
    })
}

module.exports = {
    search,
    listCitizenEvents,
    register
}