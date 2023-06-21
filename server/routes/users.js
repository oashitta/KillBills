const express = require("express");
const router = express.Router();
const users = require("../db/queries/users");

// GET /users
router.get("/", (req, res) => {
  users.getUsers().then((data) => {
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

// POST /users
router.post("/", (req, res) => {
  const { auth0_sub, name, email } = req.body;
  users
    .addBill(auth0_sub, name, email)
    .then((data) => {
      res.json({ users: data });
    });
});

module.exports = router;