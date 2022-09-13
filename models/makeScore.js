const db = require("../db/connection.js");

const makeScore = async (score, user) => {
  try {
    const nameQuery = `INSERT INTO users(username) VALUES('${user}') ON CONFLICT(username)DO NOTHING;`;
    const checkIfNameExists = await db.query(nameQuery);
    const stringQuery = `INSERT INTO scores(score, user_id) VALUES (${score}, (SELECT user_id FROM users WHERE username='${user}')) RETURNING *;`;
    const insertScore = await db.query(stringQuery);

    if (insertScore.rows.length > 0) {
      console.log(insertScore.rows);
      return insertScore.rows;
    }
  } catch (error) {
    throw "A SQL error has occured " + error;
  }
};

module.exports = makeScore;
