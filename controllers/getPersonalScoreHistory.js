const fetchPersonalScoreHistory = require("../models/fetchPersonalScoreHistory.js");
const { validationResult } = require("express-validator");

const getPersonalScoreHistory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    } else {
      const scoreHistory = await fetchPersonalScoreHistory(
        req.params.username,
        req.query.limit,
        req.query.direction
      );
      if (scoreHistory.length > 0) {
        res.status(200).send({ personalScores: scoreHistory });
      }
    }
  } catch (error) {
    console.log(error, "<<");
    res.status(500).send({ error: `Internal SQL ERROR: ${error}` });
  }
};

module.exports = getPersonalScoreHistory;
