const mysql = require("mysql");
const config = require('../database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* Mahdi Khaliki */
function user_signup(request, response) {
  // Config your database credential
  const con = mysql.createConnection(config);

  con.connect(err => {
    if (err) throw err;
    console.log("Connected!");

    let sql;
    const user = request.body;

    // sanitize and check variables (To-do)

    const hashed_password = bcrypt.hashSync(user.password, saltRounds);

    if('organization' in user) {
      sql = 'INSERT INTO Service_Provider (first_name, last_name, organization, password, email) '+
                `VALUES("${user.first_name}", "${user.last_name}", "${user.organization}", "${hashed_password}", "${user.email}")`;
    }
    else {
      sql = 'INSERT INTO User (first_name, last_name, password, email) '+
                `VALUES("${user.first_name}", "${user.last_name}", "${hashed_password}", "${user.email}")`;
    }

    con.query(sql, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        response.status(500).send({error: err.sqlMessage});
      }
      else {
        response.send({
          user_id: result.insertId,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        });
      }
    });
  });
};

module.exports = user_signup;
