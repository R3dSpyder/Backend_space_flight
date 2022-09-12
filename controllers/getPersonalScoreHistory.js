const fetchPersonalScoreHistory = require("../models/fetchPersonalScoreHistory.js");

const getPersonalScoreHistory = async (req, res, next) => {
  if (req.params.username) {
    try {
      const scoreHistory = await fetchPersonalScoreHistory(
        req.params.username,
        req.query.limit,
        req.query.direction
      );
      if (scoreHistory.length > 0) {
        res.status(200).send({ personalScores: scoreHistory });
      }
    } catch (error) {
      res.status(400).send({ error: error });
    }
  } else {
    res.status(400).send({ error: "please provide a username" });
  }
};

module.exports = getPersonalScoreHistory;
