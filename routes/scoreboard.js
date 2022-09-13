const getScoreboard = require("../controllers/getScoreboard.js");
const postToScoreboard = require("../controllers/postToScoreboard.js");
const express = require("express");

const router = express.Router();
router.route("/").get(getScoreboard).post(postToScoreboard);

module.exports = router;
