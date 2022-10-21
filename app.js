const scores = require("./routes/scores");
const users = require("./routes/users");
const cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/scores", scores);
app.use("/api/users", users);
module.exports = app;
