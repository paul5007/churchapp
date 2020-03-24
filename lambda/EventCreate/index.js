const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event)
  var body = JSON.parse(event.body);
  var eventName = body["eventName"];
  var description = body["description"];
  var minVolunteers = body["minVolunteers"];
  var maxVolunteers = body["maxVolunteers"];
  var eventStartTime = body["eventStartTime"];
  var eventEndTime = body["eventEndTime"];
  var username = body["username"];
  if (maxVolunteers == null) {
    maxVolunteers = -1;
  } else {
    maxVolunteers = parseInt(maxVolunteers)
  }
  if (eventEndTime == null) {
    eventEndTime = -1;
  } else {
    eventEndTime = parseInt(eventEndTime)
  }

  pool.query(
    'INSERT INTO public."Event"("EventName", "Description", "MinVolunteers", "MaxVolunteers", "EventStartTime", "EventEndTime", "CreatedBy", "CreateTime", "UpdatedBy", "UpdateTime") VALUES ($1, $2, $3, $4, $5, $6, $7, (extract(epoch from NOW()) * 1000), $7, (extract(epoch from NOW()) * 1000)) RETURNING "ID";',
    [eventName, description, minVolunteers, maxVolunteers, eventStartTime, eventEndTime, username],
    (err, res) => {
      if (err != null) {
        var response = {
          statusCode: 400,
          isBase64Encoded: false,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: "Failed to created Event: " + eventName
        };
        callback(err, response);
      }

      var obj = {
        "ID": res.rows[0]["ID"]
      };
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
