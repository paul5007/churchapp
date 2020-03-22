const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var body = JSON.parse(event.body);
  var username = body["username"];
  var password = body["password"];
  var email = body["email"];

  pool.query(
    'INSERT INTO public."User"("Username") VALUES ($1);',
    [username],
    (err, res) => {
      if (err !== null) {
        callback(err, res);
      }
    }
  );

  pool.query(
    'INSERT INTO public."UserPrivate"("Username", "Password", "Email") VALUES ($1, $2, $3);',
    [username, password, email],
    (err, res) => {
      var response = {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: "Successfully created User: " + username
      };
      callback(err, response);
    }
  );
};
