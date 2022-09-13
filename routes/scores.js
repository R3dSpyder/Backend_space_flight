const getScores = require("../controllers/getScores.js");
const getPersonalScoreHistory = require("../controllers/getPersonalScoreHistory.js");
const postScore = require("../controllers/postScore.js");
const express = require("express");

const router = express.Router();

router.route("/").get(getScores).post(postScore);
router.route("/userScores/:username").get(getPersonalScoreHistory);
module.exports = router;
