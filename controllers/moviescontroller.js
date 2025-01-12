const connection = require("../db/movies");

// # INDEX
function index(req, res) {
  connection.query("SELECT * FROM `movies`", (err, results) => {
    console.log(results);
  });

  res.json({
    status: "ok",
  });
}

// # EXPORTS
module.exports = { index };
