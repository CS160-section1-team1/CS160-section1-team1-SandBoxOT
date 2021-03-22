const mysql = require('mysql');
const config = require('../database');
//const bcrypt = require('bcrypt');

function user_signin(req, res){
    // connect to database
    const con = mysql.createConnection(config);

    con.connect(err => {
        if (err) throw err;
        console.log("Connected!");

        const user = req.body;

        // get email and password
        var email = user.email;
        //var password = user.password;
        

        var sqlQuery = `SELECT * FROM User WHERE email = ${email}`;

        //check if user exists
        // get pword from user with email
        // compare
        
        con.query(sqlQuery, (error, result) => {
            if (error) {
              console.log(error.sqlMessage);
              res.status(401).send({error: 'Auth failed'});
            }

            // compare given password at sign in to hashed password
            // how do I get the pword the user entered?
            // how do I get the hashed pword from db
            // bcrypt.compare(user.password, user.)

            else {
              res.send({
                user_id: result.insertId,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
              });
            }
          });

        // check if email is already in database

        // check if email/password combo matches user in database
        

    });
};


module.exports = user_signin;