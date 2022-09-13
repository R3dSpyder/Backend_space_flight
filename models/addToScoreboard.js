const db = require("../db/connection.js");

const addToScoreboard = async (username, score) => {
  try {
    const stringQuery = `INSERT INTO scoreboard(username, score) 
                             VALUES ($1, $2) RETURNING *;`;
    const insertScore = await db.query(stringQuery, [username, score]);
    return insertScore.rows;
  } catch (error) {
    throw "A SQL error has occured " + error;
  }
};

module.exports = addToScoreboard;
