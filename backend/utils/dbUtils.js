/* Keven Lam*/
const mysql = require('mysql');
const config = require('./database');

function query(sqlString, values) {
    return new Promise((resolve, reject) => {

        // Connect to the DB
        const conn = mysql.createConnection(config);
        conn.connect(err => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                console.log("Connected to Database!");

                // If connected, execute query
                conn.query(sqlString, values, (err, result) => {
                    conn.end();     // Close connection, do not need anymore

                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    else {
                        console.log("Query Succuessful!");
                        resolve(result);
                    }
                });
            }
        });
    });
}

module.exports = {query};