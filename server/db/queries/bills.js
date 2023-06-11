const db = require("../../configs/db.config");

const getAllBills = (userId) => {
  return db
    .query("SELECT * FROM bills WHERE user_id = $1", [userId])
    .then((data) => {
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

const getAllBillsByCategory = (userId, categoryId) => {
  return db
    .query("SELECT * FROM bills WHERE user_id = $1 AND payee_id IN (SELECT id FROM payees WHERE category_id = $2)", [userId, categoryId])
    .then((data) => {
      return data.rows;
    });
};

const getAllBillsUnpaid = (userId) => {
  return db
    .query("SELECT * FROM bills WHERE user_id = $1 AND paid_date IS NULL", [userId])
    .then((data) => {
      return data.rows;
    });
};

const getAllBillsDue = (userId) => {
  return db
    .query("SELECT * FROM bills WHERE user_id = $1 AND due_date > CURRENT_DATE", [userId])
    .then((data) => {
      return data.rows;
    });
};

const getAllBillsOverdue = (userId) => {
  return db
    .query("SELECT * FROM bills WHERE user_id = $1 AND due_date < CURRENT_DATE", [userId])
    .then((data) => {
      return data.rows;
    });
};

const getAllBillsByDate = (userId, startDate, endDate) => {
  return db
    .query("SELECT * FROM bills WHERE user_id = $1 AND due_date >= $2 AND due_date <= $3", [userId, startDate, endDate])
    .then((data) => {
      return data.rows;
    });
};

const getBillsTotalByCategory = (userId, categoryId) => {
  return db
    .query(
      "SELECT SUM(amount) AS total_amount FROM bills WHERE user_id = $1 AND payee_id IN (SELECT id FROM payees WHERE category_id = $2)",
      [userId, categoryId]
    )
    .then((data) => {
      return data.rows[0].total_amount || 0;
    });
};

const getBillsTotalUnpaid = (userId) => {
  return db
    .query("SELECT SUM(amount) AS total_amount FROM bills WHERE user_id = $1 AND paid_date IS NULL", [userId])
    .then((data) => {
      return data.rows[0].total_amount || 0;
    });
};

const getBillsTotalDue = (userId) => {
  return db
    .query("SELECT SUM(amount) AS total_amount FROM bills WHERE user_id = $1 AND due_date >= CURRENT_DATE", [userId])
    .then((data) => {
      return data.rows[0].total_amount || 0;
    });
};

const getBillsTotalOverdue = (userId) => {
  return db
    .query("SELECT SUM(amount) AS total_amount FROM bills WHERE user_id = $1 AND due_date < CURRENT_DATE", [userId])
    .then((data) => {
      return data.rows[0].total_amount || 0;
    });
};

const getBillsTotalByDate = (userId, startDate, endDate) => {
  return db
    .query("SELECT SUM(amount) AS total_amount FROM bills WHERE user_id = $1 AND due_date >= $2 AND due_date <= $3", [userId, startDate, endDate])
    .then((data) => {
      return data.rows[0].total_amount || 0;
    });
};

module.exports = { 
  getAllBills, 
  getBillById, 
  createBill, 
  updateBill, 
  deleteBill, 
  getAllBillsByCategory, 
  getAllBillsUnpaid, 
  getAllBillsDue, 
  getAllBillsOverdue, 
  getAllBillsByDate,
  getBillsTotalByCategory,
  getBillsTotalUnpaid,
  getBillsTotalDue,
  getBillsTotalOverdue,
  getBillsTotalByDate
};