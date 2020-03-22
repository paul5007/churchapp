const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var body = JSON.parse(event.body)
  const username = [body['username']];
  const password = [body['password']];

  pool.query(
    'SELECT "Username" FROM public."UserPrivate" where "Username" = $1 and "Password" = $2;',
    [username[0], password[0]],
    (err, res) => {
      var response = {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: "Successfully logged in"
      };
      callback(err, response);
    }
  );
};
