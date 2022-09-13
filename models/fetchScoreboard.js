const db = require("../db/connection.js");

const fetchScoreboard = async () => {
  let queryString = `SELECT * FROM scoreboard;`;
  try {
    const returnedScoreboard = await db.query(queryString);
    return returnedScoreboard.rows;
  } catch (error) {
    throw "An SQL error has occured " + error;
  }
};

module.exports = fetchScoreboard;
