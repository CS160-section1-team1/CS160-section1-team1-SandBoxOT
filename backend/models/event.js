/* Keven Lam */
const dbUtils = require('../utils/dbUtils');

function getById(req, res) {

    const sql = 'SELECT * FROM Event_View WHERE event_id = ?';

    dbUtils.query(sql, [req.params.id])
    .then(results => {
        const event = results[0];

        res.json({
            name: event.name,
            description: event.description,
            date: event.date,
            fee: event.fee,
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

    const sql = 'SELECT * FROM Event_View WHERE name LIKE ?';

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

    const sql = 'SELECT * FROM Event_View ' +
        'WHERE event_id IN ' +
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

    const sql = 'SELECT * FROM Event_View ' + 
        'WHERE service_provider_id = ?';

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

function listIndexEvents(req, res) {

    const sql = 'SELECT * FROM Event_View ' + 
        'ORDER BY event_id DESC ' +
        'LIMIT 5';

    dbUtils.query(sql, [])
    .then(results => {

        console.log('Index Event List Successful!');
        res.json({
            eventList: results
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Index Event List Failed!'});
    })
}

function create(req, res) {

    const address = {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: parseInt(req.body.zip)
    };

    dbUtils.insert('Address', address)
    .then(result => {
        const event = {
            name: req.body.name,
            description: req.body.description,
            date: new Date(req.body.date),
            fee: parseFloat(req.body.fee),
            picture: req.file.buffer,
            service_provider_id: parseInt(req.body.service_provider_id),
            address_id: result.insertId
        }
        return dbUtils.insert('Event', event);
    })
    .then(result => {
        console.log('Event Creation Succuessful!');
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
    
    let sql = 'SELECT (Event.fee <= Balance.balance) AS sufficient ' +
            'FROM Event, Balance ' +
            'WHERE Event.event_id = ? AND Balance.user_id = ?';

    dbUtils.query(sql, [req.body.event_id, req.body.user_id])
    .then(results => {

        if (!results[0].sufficient) throw new Error('Insufficient Funds');

        sql = 'INSERT INTO User_Event VALUES (?, ?)';
        return dbUtils.query(sql, [req.body.user_id, req.body.event_id])
    })
    .then(results => {

        sql = 'UPDATE Balance ' +
            'SET balance = balance - (SELECT fee FROM Event WHERE event_id = ?) ' + 
            'WHERE user_id = ?';

        return dbUtils.query(sql, [req.body.event_id, req.body.user_id]);
    })
    .then(results => {

        console.log('Event Registration Succuessful!');
        res.json({
            redirect: 'accountCitizen.html'
        });
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Event Registration Failed!'});
    })
}

/*Adam Walker */
function deleteEvent(req,res){
    let sql;
    const event_id = req.params.id;

    sql = `DELETE FROM Address WHERE address_id = (SELECT address_id FROM Event WHERE event_id = ${event_id})`;

    dbUtils.query(sql,[])
    .then(result =>{
        console.log('Event successfully deleted');
        res.json({
            redirect: 'account.html'
        });
    })
    .catch(err =>{
        console.error(err);
        res.status(401).send({error: 'Failed: Delete event'});
    });
}

module.exports = {
    search,
    listCitizenEvents,
    register,
    deleteEvent,
    listServicerEvents,
    getById,
    create,
    listIndexEvents
}