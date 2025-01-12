// # INIT EXPRESS
const express = require("express");
const app = express();

// # MIDDLEWARES IMPORTS
const errorsHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

// # JSON PARSER FOR BODY REQUEST
app.use(express.json());
