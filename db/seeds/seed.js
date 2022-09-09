const db = require("../connection");
const format = require("pg-format");

const seed = async ({ users, scores }) => {
  await db.query("DROP TABLE IF EXISTS scores");
  await db.query("DROP TABLE IF EXISTS users");

  await db.query(`CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT NOW());`);

  await db.query(`CREATE TABLE scores(
              score_id SERIAL PRIMARY KEY,
              user_id INT REFERENCES users(user_id) NOT NULL,
              score INT DEFAULT 0 NOT NULL,
              created_at TIMESTAMP DEFAULT NOW());`);

  const userString = format(
    "INSERT INTO users (username) VALUES %L RETURNING *;",
    users.map(({ username }) => [username])
  );

  const userRows = await db.query(userString).then(({ rows }) => rows);

  const scoreString = format(
    "INSERT INTO scores (user_id,score) VALUES %L RETURNING *;",
    scores.map(({ score, user_id }) => [user_id, score])
  );

  const scoreRows = await db.query(scoreString).then(({ rows }) => rows);
};

module.exports = seed;
