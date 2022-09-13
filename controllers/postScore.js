const makeScore = require("../models/makeScore.js");

const postScore = async (req, res, next) => {
  console.log(req.body);
  if (req.body.score && req.body.username) {
    try {
      const putScore = await makeScore(req.body.score, req.body.username);
      if (putScore.length > 0) {
        res.status(201).send({ putScore: putScore });
      }
    } catch (error) {
      res.status(400).send({ error: error });
    }
  } else {
    res.status(500).send({
      error: "You must supply a score and username",
    });
  }
};

module.exports = postScore;
