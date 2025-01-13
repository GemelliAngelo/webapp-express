// # INIT EXPRESS
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: process.env.APP_FRONTEND_URL,
  optionSuccessStatus: 200,
};

// # MIDDLEWARES IMPORTS
const errorsHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

// # ROUTER INPORT
const moviesRouter = require("./routers/moviesRouter");

// # JSON PARSER FOR BODY REQUEST
app.use(express.json());

// # PUBLIC STATIC ASSETS
app.use(express.static("public"));

const { APP_HOST, APP_PORT } = process.env;

// # EXPRESS ROUTING
app.use("/movies", moviesRouter);

app.use(cors(corsOptions));

// # HOMEPAGE
app.get("/", (req, res) => {
  res.send(`<h1>APP CONNESSA</h1>`);
});

// # HANDLING ERRORS
app.use(errorsHandler);
app.use(notFound);

// # SERVER LISTENING
app.listen(APP_PORT, () => {
  console.log(`App listening at ${APP_HOST}:${APP_PORT}`);
});
