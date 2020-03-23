const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var body = JSON.parse(event.body)
  const username = body['username'];
  const password = body['password'];

  pool.query(
    'SELECT "Username" FROM public."UserPrivate" where "Username" = $1 and "Password" = $2;',
    [username, password],
    (err, res) => {
      if (err == null && res.rows[0] != null) {
        var obj = {
          "token": username
        };
      }

      var response = {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(obj)
      };
      callback(err, response);
    }
  );
};
