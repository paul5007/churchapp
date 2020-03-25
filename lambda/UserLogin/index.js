const { Pool } = require("pg");
const bcrypt = require('bcrypt');
const pool = new Pool();
pool.connect();
const saltRounds = 10;

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var body = JSON.parse(event.body)
  const username = body['username'];
  const password = body['password'];

  pool.query(
    'SELECT "Username", "Password" FROM public."UserPrivate" where "Username" = $1;',
    [username],
    (err, res) => {
      if (err !== undefined) {
        var response = {
          statusCode: 400,
          isBase64Encoded: false,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: "Failed to Login: " + username
        };
        callback(null, response);
      }
      bcrypt.compare(password, res.rows[0]['Password'], function (err, result) {
        if (err !== undefined) {
          console.log(err)
        }
        if (result == true) {
          var obj = {
            "token": username
          };
          var response = {
            statusCode: 200,
            isBase64Encoded: false,
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(obj)
          };
        } else {
          var response = {
            statusCode: 400,
            isBase64Encoded: false,
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
            body: "Invalid password"
          };
        }
        callback(err, response);
      });
    }
  );
};
