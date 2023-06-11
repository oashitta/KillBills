const express = require("express");
const router = express.Router();
const usersQuery = require('../db/queries/users')

// all routes will go here
router.get("/", (req, res) => {
  res.json(users);
});

router.post('/new', (req, res) => {
  const {name, email, password} = req.body;

  usersQuery.createUser(name, email, password)
})

module.exports = router;
