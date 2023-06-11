const db = require("../../configs/db.config");

const getAllPayees = () => {
  return db.query("SELECT * FROM payees").then((data) => {
    return data.rows;
  });
};

const getPayeeById = (id) => {
  return db.query("SELECT * FROM payees WHERE id = $1", [id]).then((data) => {
    return data.rows[0];
  });
};

const updatePayee = (id, name, url, accountNumber, isHidden, categoryId) => {
  return db
    .query(
      "UPDATE payees SET name = $2, url = $3, account_number = $4, is_hidden = $5, category_id = $6 WHERE id = $1 RETURNING *",
      [id, name, url, accountNumber, isHidden, categoryId]
    )
    .then((data) => {
      return data.rows[0];
    });
};

module.exports = { getAllPayees, getPayeeById, updatePayee };
