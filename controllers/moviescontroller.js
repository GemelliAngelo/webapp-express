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

// # SHOW
function show(req, res) {
  // * variables
  const id = parseInt(req.params.id);
  const sqlPost = "SELECT * FROM movies WHERE id= ?";

  connection.query(sqlPost, [id], (err, movieResults) => {
    // * managing error
    if (isNaN(id)) {
      console.log(err);
      return res.status(400).json({ error: err });
    }

    let movie = movieResults[0];

    const sqlReviews =
      "SELECT `reviews`.`name`, `reviews`.`vote`, `reviews`.`text`, `reviews`.`created_at`,`reviews`.`updated_at` FROM `movies` INNER JOIN `reviews` ON `reviews`.`movie_id`=`movies`.`id` WHERE `movies`.`id`=?";

    connection.query(sqlReviews, [id], (err, reviewsResults) => {
      // * managing error
      if (isNaN(id)) {
        console.log(err);
        return res.status(400).json({ error: err });
      }

      // * output
      movie.reviews = reviewsResults;

      res.json(movie);
    });
  });
}

// # EXPORTS
module.exports = { index, show };
