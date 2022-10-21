const { param, query, body } = require("express-validator");
require("express-validator");

const getScores = require("../controllers/getScores.js");
const getPersonalScoreHistory = require("../controllers/getPersonalScoreHistory.js");
const postScore = require("../controllers/postScore.js");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(
    [
      query("limit").trim().escape().stripLow().optional({ checkFalsy: true }),
      query("direction")
        .trim()
        .escape()
        .stripLow()
        .optional({ checkFalsy: true }),
    ],
    getScores
  )
  .post(
    [
      body("score").notEmpty().isNumeric().trim().escape().stripLow(),
      body("username")
        .not()
        .notEmpty()
        .isAlphanumeric()
        .trim()
        .escape()
        .stripLow(),
    ],
    postScore
  );

router
  .route("/userScores/:username")
  .get(
    [
      param("username")
        .notEmpty()
        .withMessage("username must be provided")
        .trim()
        .escape()
        .stripLow(),
      query("limit")
        .trim()
        .escape()
        .stripLow()
        .optional({ checkFalsy: true })
        .toInt(),
      query("direction")
        .trim()
        .escape()
        .stripLow()
        .optional({ checkFalsy: true }),
    ],
    getPersonalScoreHistory
  );
module.exports = router;
