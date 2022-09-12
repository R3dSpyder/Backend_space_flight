const db = require("../db/connection.js");

const fetchPersonalScoreHistory = async (
  username,
  limit = 10,
  direction = "DESC"
) => {
  let queryString = `SELECT * FROM scores WHERE user_id=ANY(SELECT user_id FROM users WHERE username='${username}') ORDER BY score ${direction} LIMIT ${limit};`;
  try {
    const returnedScores = await db.query(queryString);
    return returnedScores.rows;
  } catch (error) {
    throw "A SQL error has occured " + error;
  }
};

module.exports = fetchPersonalScoreHistory;
