const makeScore = require("../models/makeScore.js");
const { validationResult } = require("express-validator");

const postScore = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    } else {
      const putScore = await makeScore(req.body.score, req.body.username);
      if (putScore.length > 0) {
        res.status(201).send({ putScore: putScore[0] });
      }
    }
  } catch (error) {
    res.status(500).send({ error: `Internal SQL error: ${error}` });
  }
};

module.exports = postScore;
