const makeUser = require("../models/makeUser.js");

const postUser = async (req, res, next) => {
  if (req.body.username) {
    try {
      const putUser = await makeUser(req.body.username);
      if (putUser) {
        res.status(201).send({ putUser: putUser });
      }
    } catch (error) {
      res.status(400).send({ error: error });
    }
  } else {
    res.status(500).send({
      error: "You have not supplied all the information to save a user",
    });
  }
};

module.exports = postUser;
