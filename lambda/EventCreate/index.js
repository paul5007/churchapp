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
  var eventStartTime = body["eventStartTime"];
  var eventEndTime = body["eventEndTime"];
  var username = body["username"];
  if (maxVolunteers == null) {
    maxVolunteers = -1;
  }

  pool.query(
    'INSERT INTO public."Event"("EventName", "Description", "MinVolunteers", "MaxVolunteers", "EventStartTime", "EventEndTime", "CreatedBy", "CreateTime", "UpdatedBy", "UpdateTime") VALUES ($1, $2, $3, $4, $5, $6, $7, (extract(epoch from NOW()) * 1000), $7, (extract(epoch from NOW()) * 1000)) RETURNING "ID";',
    [eventName, description, minVolunteers, maxVolunteers, eventStartTime, eventEndTime, username],
    (err, res) => {
      if (err !== undefined) {
        var response = {
          statusCode: 400,
          isBase64Encoded: false,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: "Failed to created Event: " + eventName
        };
        callback(null, response);
      }

      var obj = {
        "ID": res.rows[0]["ID"]
      };
      var responseOK = {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(obj)
      };
      pool.query(
        'INSERT INTO public."EventRole"("EventID", "RoleName", "RoleDescription", "CreatedBy", "CreateTime", "UpdatedBy", "UpdateTime") VALUES ($1, $2, $3, $4, (extract(epoch from NOW()) * 1000), $4, (extract(epoch from NOW()) * 1000)) RETURNING "ID";',
        [obj.ID, 'Organizer', 'In charge of organizing event', username],
        (err, res) => {
          if (err !== undefined) {
            var response = {
              statusCode: 400,
              isBase64Encoded: false,
              headers: {
                "Access-Control-Allow-Origin": "*"
              },
              body: "Failed to create EventRole: " + username
            };
            callback(null, response);
          }

          var obj = {
            "ID": res.rows[0]["ID"]
          };
          pool.query(
            'INSERT INTO public."UserEventRoleLookup"("Username", "EventRoleID") VALUES ($1, $2);',
            [username, obj.ID],
            (err, res) => {
              if (err !== undefined) {
                var response = {
                  statusCode: 400,
                  isBase64Encoded: false,
                  headers: {
                    "Access-Control-Allow-Origin": "*"
                  },
                  body: "Failed to create UserEventRoleLookup: " + username
                };
                callback(null, response);
              }

              // Call back from original
              callback(err, responseOK);
            }
          );
        }
      );
    }
  );
};
