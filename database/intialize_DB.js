const config = require('../database');
const mysql = require("mysql");

// Config your database credential
const con = mysql.createConnection(config);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "CREATE TABLE User (id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(25) NOT NULL, last_name VARCHAR(25) NOT NULL, password BINARY(32) NOT NULL, email VARCHAR(50) NOT NULL UNIQUE, PRIMARY KEY (id))";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
