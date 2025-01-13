const connection = require("../db/movies");
const { APP_HOST, APP_PORT } = process.env;

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

    const movies = results.map((movie) => {
      return {
        ...movie,
        cover: `${APP_HOST}:${APP_PORT}/img/${movie.title
          .toLowerCase()
          .replace(" ", "_")}.jpg`,
      };
    });

    // output
    res.json(movies);
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

    const sqlReviews = `SELECT 
      reviews.id,
      reviews.name, 
      reviews.vote, 
      reviews.text, 
      reviews.created_at,
      reviews.updated_at 
      FROM movies 
      INNER JOIN reviews 
      ON reviews.movie_id=movies.id 
      WHERE movies.id=?`;

    connection.query(sqlReviews, [id], (err, reviewsResults) => {
      // * managing error
      if (isNaN(id)) {
        console.log(err);
        return res.status(400).json({ error: err });
      }

      // * output
      const movie = {
        ...movieResults[0],
        cover: `${APP_HOST}:${APP_PORT}/img/${movieResults[0].title
          .toLowerCase()
          .replace(" ", "_")}.jpg`,
        reviews: reviewsResults,
      };
      res.json(movie);
    });
  });
}

// # EXPORTS
module.exports = { index, show };
