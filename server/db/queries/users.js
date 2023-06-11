const db = require('../../configs/db.config');

const createUser = (name, email, password) => {
  return db.query((
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`), [name, email, password]);
};

module.exports = { createUser };