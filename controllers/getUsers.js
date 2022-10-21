const fetchUsers = require("../models/fetchUsers.js");
const { validationResult } = require("express-validator");
const getUsers = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    } else {
      const userResults = await fetchUsers(
        req.query.limit,
        req.query.direction,
        req.query.username
      );

      if (userResults.length > 0) {
        res.status(200).send({ users: userResults });
      }
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = getUsers;
