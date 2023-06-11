const db = require("../../configs/db.config");

const getUsers = () => {
  return db.query("SELECT * FROM users").then((data) => {
    return data.rows;
  });
};

const getUserById = (id) => {
  return db.query("SELECT * FROM users WHERE id = $1", [id]).then((data) => {
    return data.rows[0];
  });
};

const addUser = (name, email, password) => {
  return db
    .query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [
      name,
      email,
      password,
    ])
    .then((data) => {
      return data.rows[0];
    });
};

const updateUser = (id, name, email, password) => {
  return db
    .query(
      "UPDATE users SET name = $2, email = $3, password = $4 WHERE id = $1 RETURNING *",
      [id, name, email, password]
    )
    .then((data) => {
      return data.rows[0];
    });
};

const deleteUser = (id) => {
  return db.query("DELETE FROM users WHERE id = $1", [id]);
};

module.exports = { getUsers, getUserById, addUser, updateUser, deleteUser };
