const express = require("express");
const router = express.Router();

// all routes will go here
router.post("/new", (req, res) => {
  res.json(users);
});

module.exports = router;