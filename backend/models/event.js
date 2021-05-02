/* Keven Lam */
const dbUtils = require('../utils/dbUtils');

function getById(req, res) {
    const sql = 'SELECT * FROM ' +
        'Event NATURAL JOIN ' +
        'Address NATURAL JOIN ' +
        'Service_Provider INNER JOIN ' +
        'User ON Service_Provider.service_provider_id = User.user_id ' +
        'WHERE Event.event_id = ?';

    dbUtils.query(sql, [req.params.id])
    .then(results => {
        const event = results[0];

        res.json({
            name: event.name,
            description: event.description,
            date: event.date,
            category: event.category,
            picture: event.picture,
            service_provider: {
                name: `${event.first_name} ${event.last_name}`,
                email: event.email,
                organization: event.organization
            },
            address: {
                street: event.street,
                city: event.city,
                state: event.state,
                zip: event.zip
            }
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Could not receive Event!'});
    })
}

function search(req, res) {

    const sql = 'SELECT * FROM Event NATURAL JOIN Address WHERE Event.name LIKE ?';

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

    const sql = 'SELECT * FROM ' + 
        'Event NATURAL JOIN Address ' + 
        'WHERE Event.event_id IN ' +
        '(SELECT event_id FROM User_Event WHERE user_id = ?)';

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

function listServicerEvents(req, res) {

    const sql = 'SELECT * FROM ' + 
        'Event NATURAL JOIN Address ' + 
        'WHERE Event.service_provider_id = ?';

    dbUtils.query(sql, [req.params.id])
    .then(results => {

        console.log('Service Provider Event List Successful!');
        res.json({
            eventList: results
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Service Provider Event List Failed!'});
    })
}

function create(req, res) {

    dbUtils.insert('Address', req.body.address)
    .then(result => {
        const event = {
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            category: req.body.category,
            picture: req.body.picture,
            service_provider_id: req.body.service_provider_id,
            address_id: result.insertId
        }
        return dbUtils.insert('Event', event);
    })
    .then(result => {
        console.log('Event Registration Succuessful!');
        res.json({
            event_id: result.insertId
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Event Creation Failed!'});
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
    listServicerEvents,
    register,
    getById,
    create
}