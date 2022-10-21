const getUsers = require("../controllers/getUsers.js");
const postUser = require("../controllers/postUser.js");
const express = require("express");
const router = express.Router();
const { query, body } = require("express-validator");
require("express-validator");
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
      query("username")
        .trim()
        .escape()
        .stripLow()
        .optional({ checkFalsy: true }),
    ],
    getUsers
  )

  .post(
    [body("username").notEmpty().isAlphanumeric().trim().escape().stripLow()],
    postUser
  );

module.exports = router;
