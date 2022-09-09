const db = require("../db/connection.js");

const fetchUsers = async (limit = null, direction = "ASC", username = null) => {
  let queryString = `SELECT * FROM users`;

  if (username != null) {
    queryString += ` WHERE username='${username}'`;
  } else {
    queryString += ` ORDER BY username ${direction}`;
    if (limit != null) {
      queryString += ` LIMIT ${limit}`;
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
