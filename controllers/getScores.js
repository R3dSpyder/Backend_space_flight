const fetchScores = require("../models/fetchScores.js");

const getScore = async (req, res, next) => {
  try {
    const scoreResults = await fetchScores(
      req.query.limit,
      req.query.direction
    );
    if (scoreResults.length > 0) {
      res.status(200).send({ scores: scoreResults });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = getScore;
