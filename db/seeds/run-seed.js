const devData = require("../development-data/index.js");
const productionData = require("../production-data/index.js");
const seed = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
  return seed(productionData).then(() => db.end());
};

runSeed();
