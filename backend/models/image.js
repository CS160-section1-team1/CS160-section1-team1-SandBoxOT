const dbUtils = require('../utils/dbUtils');

function getByEventId(req, res) {
    const sql = 'SELECT picture FROM Event WHERE event_id = ?';

    dbUtils.query(sql, [req.params.id])
    .then(results => {
        if (!results[0].picture) throw new Error('No Photo Uploaded!');

        res.send(results[0].picture);
    })
    .catch(err => {
        console.error(err);
        res.status(401).send({error: 'Could not receive Image!'});
    });
}

module.exports = {
    getByEventId
};