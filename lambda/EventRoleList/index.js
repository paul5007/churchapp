const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const eventID = event["pathParameters"]["eventID"];

  pool.query(
    'SELECT "RoleName", "RoleDescription", "RoleMaxVolunteers" FROM public."EventRole" WHERE "EventID" = $1;',
    [eventID],
    (err, res) => {
      var response = {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(res.rows)
      };
      callback(err, response);
    }
  );
};
