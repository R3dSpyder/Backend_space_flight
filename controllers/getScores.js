const fetchScores = require("../models/fetchScores.js");
const { validationResult } = require("express-validator");

const getScore = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    } else {
      const scoreResults = await fetchScores(
        req.query.limit,
        req.query.direction
      );
      if (scoreResults.length > 0) {
        res.status(200).send({ scores: scoreResults });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: `Internal SQL ERROR: ${error}` });
  }
};

module.exports = getScore;
