/* Keven Lam*/
const mysql = require('mysql');
const config = require('./database');

// General function for Any SQL Operation
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
                // console.log("Connected to Database!");

                // If connected, execute query
                conn.query(sqlString, values, (err, result) => {
                    conn.end();     // Close connection, do not need anymore

                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    else {
                        // console.log("Query Succuessful!");
                        resolve(result);
                    }
                });
            }
        });
    });
}

// Get a Row from the Given Table with the given ID
function queryById(table, id) {
    const sql = `SELECT * FROM ${table} WHERE id = ?`;
    return query(sql, [id]);
}

// Insert to the Given Table all values in the Given Object
function insert(table, values) {
    const sql = `INSERT INTO ${table} SET ?`;
    return query(sql, values);
}

module.exports = {query, queryById, insert};