const fs = require("fs");
const Logger = require("./Logger.js");

module.exports = (list) => {
  list.stats = JSON.parse(fs.readFileSync("./stats.json", "utf8"));
  
  list.db = (x) => fs.writeFile("./stats.json", JSON.stringify(x), (err) => {
        if (err) Logger.error(err)
    });
};
