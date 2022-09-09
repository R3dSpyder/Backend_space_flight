const db = require("../db/connection.js");

const makeUser = async (username) => {
  try {
    const stringQuery = `INSERT INTO users(username) VALUES('${username}') RETURNING *;`;

    const insertUser = await db.query(stringQuery);

    if (insertUser.rows.length > 0) {
      return insertUser.rows;
    }
  } catch (error) {
    throw "A SQL error has occured " + error;
  }
};

module.exports = makeUser;
