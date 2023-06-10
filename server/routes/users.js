const express = require("express");
const router = express.Router();

const usersQuery = require('../db/queries/users')

// all routes will go here
router.get("/", (req, res) => {
  usersQuery.getUsers()
    .then((users) => {
      return res.json(users.rows)
    })
});

router.post('/new', (req, res) => {
  const {name, email, password} = req.body;
  console.log("values", name)

  usersQuery.addUser(name, email, password)
  // .then((id)=>{
  //   res.json(id);
  // });
})

module.exports = router;
