const db = require("../db/connection.js");
const format = require("pg-format");

const fetchUsers = async (limit = null, direction = "ASC", username = null) => {
  let queryString = "SELECT * FROM users";

  if (username != null) {
    queryString += format(" WHERE username=%L", username);
  } else {
    queryString += format(" ORDER BY username %s", direction);
    if (limit != null) {
      queryString += format(" LIMIT %L", limit);
    }
  }
  queryString += ";";

  try {
    const returnedScores = await db.query(queryString);

    return returnedScores.rows;
  } catch (error) {
    throw "A SQL error has occured " + error;
  }
};

module.exports = fetchUsers;
