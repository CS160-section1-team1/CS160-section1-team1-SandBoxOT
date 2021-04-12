const mysql = require('mysql');
const config = require('./database');
const bcrypt = require('bcrypt');

/* Adam Walker */
function user_signin(request, response){
   
    const con = mysql.createConnection(config);

    // connect to database
    con.connect(err => {
        if (err) throw err;
        console.log("Connected!");

        const user = request.body;

        // get email and password from login page
        var email = user.email;
        let password = user.password;
        
        // Query database
        con.query('SELECT * FROM User WHERE email = ?', [email], function(error, result)  {
          // if error querying from database
          if (error) {
            console.log(error.sqlMessage);
            response.status(401).send({error: 'Auth failed'});
          }
          else{ 
            if(result.length > 0){
              // compare password entered to password in database
              let compare = bcrypt.compareSync(password, result[0].password);
                
                if(compare){
                  // login succeeded, send user info  
                  response.json({
                    user_id: result[0].id,
                    first_name: result[0].first_name,
                    last_name: result[0].last_name,
                    email: result[0].email
                  });
                  console.log("Login successful!");
                }
                // Email and password dont match
                else{
                  response.status(401).send({error: 'Email or password dont match'});
                }
            }
            // Email does not exist in database
            else{
              response.status(401).send({error: 'Email or password dont match'});
            }
          }
        });          
    });
};

module.exports = user_signin;