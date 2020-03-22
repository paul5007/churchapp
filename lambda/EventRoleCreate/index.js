const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var body = JSON.parse(event.body);
  var eventID = body["eventID"];
  var roleName = body["roleName"];
  var description = body["description"];
  var username = body["username"];

  pool.query(
    'INSERT INTO public."EventRole" ("EventID", "RoleName", "RoleDescription", "CreatedBy", "CreateTime", "UpdatedBy", "UpdateTime") VALUES ($1, $2, $3, $4, NOW(), $4, NOW());',
    [eventID, roleName, description, username],
    (err, res) => {
      var response = {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: "Successfully created Role: " + roleName
      };
      callback(err, response);
    }
  );
};
