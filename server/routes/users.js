const express = require("express");
const router = express.Router();
const users = require("../db/queries/users");

// GET /users
router.get("/", (req, res) => {
  users.getAllUsers().then((data) => {
    res.json({ users: data });
  });
});

// GET /users/:id
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  users.getUserById(userId).then((data) => {
    res.json({ user: data });
  });
});

module.exports = router;