const fetchScoreboard = require("../models/fetchScoreboard.js");

const getScoreboard = async (req, res, next) => {
  try {
    const scoreboard = await fetchScoreboard();
    if (scoreboard.length) {
      res.status(200).send({ scores: scoreboard });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = getScoreboard;
