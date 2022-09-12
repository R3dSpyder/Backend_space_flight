const fetchUsers = require("../models/fetchUsers.js");

const getUsers = async (req, res, next) => {
  try {
    const userResults = await fetchUsers(
      req.query.limit,
      req.query.direction,
      req.query.username
    );

    if (userResults.length > 0) {
      res.status(200).send({ users: userResults });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = getUsers;
