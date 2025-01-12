// # EXPRESS INPORT
const express = require("express");

// # ROUTER CONFIG
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
  });
});

// # EXPORTS
module.exports = router;
