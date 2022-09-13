const db = require("../connection");
const format = require("pg-format");

const seed = async ({ users, scores, scoreboard }) => {
  await db.query("DROP TABLE IF EXISTS scores");
  await db.query("DROP TABLE IF EXISTS users");
  await db.query("DROP TABLE IF EXISTS scoreboard");

  await db.query(`CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT NOW());`);

  await db.query(`CREATE TABLE scores(
              score_id SERIAL PRIMARY KEY,
              user_id INT REFERENCES users(user_id) NOT NULL,
              score INT DEFAULT 0 NOT NULL,
              created_at TIMESTAMP DEFAULT NOW());`);

  await db.query(`CREATE TABLE scoreboard(
    username TEXT NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW())`);

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

  const scoreboardString = format(
    "INSERT INTO scoreboard (username, score) VALUES %L;",
    scoreboard.map(({ username, score }) => [username, score])
  );

  const scoreboardRows = await db
    .query(scoreboardString)
    .then(({ rows }) => rows);
};

module.exports = seed;
