const db = require("../../configs/db.config");

const getCategories = () => {
  return db.query("SELECT * FROM categories").then((data) => {
    return data.rows;
  });
};

const getCategoryById = (id) => {
  return db.query("SELECT * FROM categories WHERE id = $1", [id]).then((data) => {
    return data.rows[0];
  });
};

module.exports = { getCategories, getCategoryById };
