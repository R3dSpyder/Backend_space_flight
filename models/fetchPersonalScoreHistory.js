const db = require("../db/connection.js");
const format = require("pg-format");

const fetchPersonalScoreHistory = async (
  username,
  limit = 10,
  direction = "DESC"
) => {
  let queryString = format(
    "SELECT * FROM scores WHERE user_id=ANY(SELECT user_id FROM users WHERE username='%s') ORDER BY score %s LIMIT %L;",
    username,
    direction,
    limit
  );
  try {
    const returnedScores = await db.query(queryString);
    return returnedScores.rows;
  } catch (error) {
    throw "A SQL error has occured " + error;
  }
};

module.exports = fetchPersonalScoreHistory;
