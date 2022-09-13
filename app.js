const scores = require("./routes/scores");
const users = require("./routes/users");
const scoreboard = require("./routes/scoreboard");
const cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());

//

app.use("/api/scores", scores);
app.use("/api/users", users);
app.use("/api/scoreboard", scoreboard);
module.exports = app;
