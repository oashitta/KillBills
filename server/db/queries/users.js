const db = require("../../configs/db.config");

const getUsers = () => {
  return db.query("SELECT * FROM users").then((data) => {
    return data.rows;
  });
};

const getUserById = (auth0Sub) => {
  return db.query("SELECT * FROM users WHERE auth0_sub = $1", [auth0Sub]).then((data) => {
    return data.rows[0];
  });
};

const addUser = (auth0Sub, name, email) => {
  return db
    .query("INSERT INTO users (auth0_sub, name, email) VALUES ($1, $2, $3, $4) RETURNING *", [
      auth0Sub,
      name,
      email
    ])
    .then((data) => {
      return data.rows[0];
    });
};

module.exports = { getUsers, getUserById, addUser };
