const db = require("../db/connection.js");
const format = require("pg-format");

const makeUser = async (username) => {
  try {
    const stringQuery = format(
      "INSERT INTO users(username) VALUES(%L) RETURNING *;",
      username
    );

    const insertUser = await db.query(stringQuery);

    if (insertUser.rows.length > 0) {
      return insertUser.rows;
    }
  } catch (error) {
    throw "A SQL error has occured " + error;
  }
};

module.exports = makeUser;
