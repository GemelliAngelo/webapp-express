const connection = require("../db/movies");

// # INDEX
function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    // managing error
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (!results.length) {
      return res.status(404).json({ error: "Not Found" });
    }

    // output
    res.json(results);
  });
}

// # EXPORTS
module.exports = { index };
