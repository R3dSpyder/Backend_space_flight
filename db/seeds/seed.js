const db = require("../connection");
const format = require("pg-format");

const seed = async ({ users, scores }) => {
  await db.query("DROP TABLE IF EXISTS scores");
  await db.query("DROP TABLE IF EXISTS users");

  await db.query(`CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL);`);

  await db.query(`CREATE TABLE scores(
              score_id SERIAL PRIMARY KEY,
              user_id INT REFERENCES users(user_id) NOT NULL,
              score INT DEFAULT 0 NOT NULL);`);

  const userString = format(
    "INSERT INTO users (username) VALUES %L RETURNING *;",
    users.map(({ username }) => [username])
  );

  const userRows = await db.query(userString).then(({ rows }) => rows);

  //   const user_id = userRows.map((user) => {
  //     console.log({ user_id: user.user_id });
  //     return { user_id: user.user_id };
  //   });

  //add on delete later

  const scoreString = format(
    "INSERT INTO scores (user_id,score) VALUES %L RETURNING *;",
    scores.map(({ score, user_id }) => [user_id, score])
  );

  const scoreRows = await db.query(scoreString).then(({ rows }) => rows);
  console.log(scoreRows);
};

module.exports = seed;
