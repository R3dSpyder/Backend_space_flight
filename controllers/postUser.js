const makeUser = require("../models/makeUser.js");
const { validationResult } = require("express-validator");

const postUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    } else {
      const putUser = await makeUser(req.body.username);
      if (putUser) {
        res.status(201).send({ putUser: putUser[0] });
      }
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = postUser;
