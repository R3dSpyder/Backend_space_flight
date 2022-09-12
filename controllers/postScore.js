const makeScore = require("../models/makeScore.js");

const postScore = async (req, res, next) => {
  if (req.body[0].score && req.body[0].username) {
    try {
      const putScore = await makeScore(req.body[0].score, req.body[0].username);
      if (putScore.length > 0) {
        res.status(201).send({ putScore: putScore });
      }
    } catch (error) {
      res.status(400).send({ error: error });
    }
  } else {
    res.status(500).send({
      error: "You must supply a score and user ID",
    });
  }
};

module.exports = postScore;
