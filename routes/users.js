const getUsers = require("../controllers/getUsers.js");
const postUser = require("../controllers/postUser.js");
const express = require("express");
const router = express.Router();

router.route("/").get(getUsers).post(postUser);

module.exports = router;
