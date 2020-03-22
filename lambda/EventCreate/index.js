const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var body = JSON.parse(event.body);
  var eventName = body["eventName"];
  var description = body["description"];
  var minVolunteers = body["minVolunteers"];
  var maxVolunteers = body["maxVolunteers"];
  var username = body["username"];

  pool.query(
    'INSERT INTO public."Event"("EventName", "Description", "MinVolunteers", "MaxVolunteers", "CreatedBy", "CreateTime", "UpdatedBy", "UpdateTime") VALUES ($1, $2, $3, $4, $5, NOW(), $5, NOW());',
    [eventName, description, parseInt(minVolunteers), maxVolunteers, username],
    (err, res) => {
      var response = {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: "Successfully created Event: " + eventName
      };
      callback(err, response);
    }
  );
};
