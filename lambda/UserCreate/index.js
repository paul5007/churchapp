const { Pool } = require("pg");
const bcrypt = require("bcrypt")
const pool = new Pool();
pool.connect();
const saltRounds = 10;

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var body = JSON.parse(event.body);
  var username = body["username"];
  var password = body["password"];
  var email = body["email"];

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err !== undefined) {
      console.log(err)
    }
    bcrypt.hash(password, salt, function (err, hash) {
      if (err !== undefined) {
        console.log(err)
      }
      console.log(hash)
      pool.query(
        'INSERT INTO public."UserPrivate"("Username", "Password", "Email") VALUES ($1, $2, $3);',
        [username, hash, email],
        (err, res) => {
          if (err !== undefined) {
            var response409 = {
              statusCode: 409,
              isBase64Encoded: false,
              headers: {
                "Access-Control-Allow-Origin": "*"
              },
            };
            callback(null, response409);
          }


          pool.query(
            'INSERT INTO public."User"("Username") VALUES ($1);',
            [username],
            (err, res) => {
              if (err !== undefined) {
                var response4092 = {
                  statusCode: 409,
                  isBase64Encoded: false,
                  headers: {
                    "Access-Control-Allow-Origin": "*"
                  },
                  body: "Failed to create User: " + username
                };
                callback(null, response4092);
              }
              var response = {
                statusCode: 200,
                isBase64Encoded: false,
                headers: {
                  "Access-Control-Allow-Origin": "*"
                }
              };
              callback(null, response);
            }
          );
        }
      );
    });
  });
};
