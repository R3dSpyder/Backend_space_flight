const db = require("../db/connection.js");

const makeScore = async (score, user_id) => {
  try {
    // INSERT INTO scores(user_id, score) VALUES(3,4) RETURNING *;
    const stringQuery = `INSERT INTO scores(user_id, score) VALUES(${user_id},${score}) RETURNING *;`;
    const insertScore = await db.query(stringQuery);

    if (insertScore.rows.length > 0) {
      return insertScore.rows;
    }
  } catch (error) {
    throw "A SQL error has occured " + error;
  }
};

module.exports = makeScore;
