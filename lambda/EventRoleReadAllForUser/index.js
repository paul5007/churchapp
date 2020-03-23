const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const username = event["pathParameters"]["username"];

    pool.query(
        'SELECT "E"."EventName","E"."Description", "ER"."RoleName" FROM public."Event" as "E" INNER JOIN public."EventRole" as "ER" ON "E"."ID" = "ER"."EventID" INNER JOIN public."UserEventRoleLookup" as "UER" ON "ER"."ID"="UER"."EventRoleID" where "UER"."Username"= $1;',
        [username],
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
