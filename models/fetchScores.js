const db = require("../db/connection.js");
const format = require("pg-format");

//sanitisation already performed in route and controller with express validator, strings clean

const fetchScores = async (limit = null, direction = "ASC") => {
  let queryString = format(
    "SELECT * FROM scores INNER JOIN users ON scores.user_id = users.user_id ORDER BY score %s",
    direction
  );

  if (limit !== null) {
    const limitString = format(" LIMIT %L", limit);
    queryString += limitString;
  }
  queryString += ";";
  try {
    const returnedScores = await db.query(queryString);
    return returnedScores.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = fetchScores;
