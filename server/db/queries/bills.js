const db = require("../../configs/db.config");

const getAllBills = () => {
  return db.query("SELECT * FROM bills").then((data) => {
    return data.rows;
  });
};

const getBillById = (id) => {
  return db.query("SELECT * FROM bills WHERE id = $1", [id]).then((data) => {
    return data.rows[0];
  });
};

const createBill = (payeeId, userId, amount, dueDate, reminderDate, paidDate, note) => {
  return db
    .query(
      "INSERT INTO bills (payee_id, user_id, amount, due_date, reminder_date, paid_date, note) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [payeeId, userId, amount, dueDate, reminderDate, paidDate, note]
    )
    .then((data) => {
      return data.rows[0];
    });
};

const updateBill = (id, payeeId, userId, amount, dueDate, reminderDate, paidDate, note) => {
  return db
    .query(
      "UPDATE bills SET payee_id = $2, user_id = $3, amount = $4, due_date = $5, reminder_date = $6, paid_date = $7, note = $8 WHERE id = $1 RETURNING *",
      [id, payeeId, userId, amount, dueDate, reminderDate, paidDate, note]
    )
    .then((data) => {
      return data.rows[0];
    });
};

const deleteBill = (id) => {
  return db.query("DELETE FROM bills WHERE id = $1", [id]);
};

module.exports = { getAllBills, getBillById, createBill, updateBill, deleteBill };
