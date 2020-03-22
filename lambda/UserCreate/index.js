const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var body = JSON.parse(event.body);
  var username = body["username"];
  var password = body["password"];

  pool.query(
    'INSERT INTO public."UserPrivate"("Username", "Password") VALUES ($1, $2);',
    [username, password],
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
