const db = require("../../configs/db.config");

const getUsers = () => {
  return db.query("SELECT * FROM users").then((data) => {
    return data.rows;
  });
};

const getUserById = (auth0Sub) => {
  return db
    .query("SELECT * FROM users WHERE auth0_sub = $1", [auth0Sub])
    .then((data) => {
      return data.rows[0];
    });
};

const addUser = (auth0Sub) => {
  return db
    .query("INSERT INTO users (auth0_sub) VALUES ($1)", [auth0Sub])
    .then((data) => {
      return data.rows[0];
    });
};

const checkUserExists = (auth0Sub) => {
  return db
    .query("SELECT EXISTS (SELECT 1 FROM users WHERE auth0_sub = $1)", [auth0Sub])
    // .then((data) => data.rows[0].exists);
    .then((data) => {
      return data.rows[0].exists;
    });
};

module.exports = { getUsers, getUserById, addUser, checkUserExists };