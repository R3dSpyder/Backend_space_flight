const db = require("../db/connection.js");
const format = require("pg-format");

const makeScore = async (score, user) => {
  try {
    const nameQuery = format(
      "INSERT INTO users (username) SELECT %L WHERE NOT EXISTS (SELECT username FROM users WHERE username = %L)",
      user,
      user
    );

    await db.query(nameQuery);
    const stringQuery = format(
      "INSERT INTO scores(score, user_id) VALUES (%s, (SELECT user_id FROM users WHERE username=%L)) RETURNING *;",
      score,
      user
    );

    const insertScore = await db.query(stringQuery);

    if (insertScore.rows.length > 0) {
      return insertScore.rows;
    }
  } catch (error) {
    throw "A SQL error has occured " + error;
  }
};

module.exports = makeScore;
