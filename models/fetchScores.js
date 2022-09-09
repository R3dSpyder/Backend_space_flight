const db = require("../db/connection.js");

const fetchScores = async (limit = null, direction = "ASC") => {
  let queryString = `SELECT * FROM scores ORDER BY score ${direction}`;

  if (limit !== null) {
    queryString += ` LIMIT ${limit}`;
  }
  queryString += ";";
  try {
    const returnedScores = await db.query(queryString);
    return returnedScores.rows;
  } catch (error) {
    throw "A SQL error has occured " + error;
  }
};

module.exports = fetchScores;
