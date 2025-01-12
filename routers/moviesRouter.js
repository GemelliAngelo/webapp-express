// # EXPRESS INPORT
const express = require("express");

// # ROUTER CONFIG
const router = express.Router();

// # CONTROLLER INPORT
const moviesController = require("../controllers/moviescontroller");

// # ROUTER METHOD
router.get("/", moviesController.index);
router.get("/:id", moviesController.show);

// # EXPORTS
module.exports = router;
