const addToScoreboard = require("../models/addToScoreboard.js");

const postToScoreboard = async (req, res, next) => {
  try {
    const putScore = await addToScoreboard(req.body.username, req.body.score);
    if (putScore.length) {
      res.status(201).send({ score: putScore[0] });
    }
  } catch (err) {
    res.status(400).send({ error: error });
  }
};

module.exports = postToScoreboard;
