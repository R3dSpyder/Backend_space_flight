const fetchPersonalScoreHistory = require("../models/fetchPersonalScoreHistory.js");

const getPersonalScoreHistory = async (req, res, next) => {
  try {
    const scoreHistory = await fetchPersonalScoreHistory(
      req.params.user_id,
      req.query.limit,
      req.query.direction
    );
    if (scoreHistory.length > 0) {
      res.status(200).send(scoreHistory);
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = getPersonalScoreHistory;
