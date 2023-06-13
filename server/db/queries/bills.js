const db = require("../../configs/db.config");

const getBills = (auth0Sub) => {
  return db
    .query(
      "SELECT b.id, b.amount, b.due_date, p.name AS payee_name, p.url AS payee_link FROM bills b JOIN users u ON b.user_id = u.id JOIN payees p ON b.payee_id = p.id WHERE u.auth0_sub = $1",
      [auth0Sub]
    )
    .then((data) => {
      return data.rows;
    });
};

const getBillById = (id) => {
  return db.query("SELECT * FROM bills WHERE id = $1", [id]).then((data) => {
    return data.rows[0];
  });
};

const addBill = (payeeId, auth0Sub, amount, dueDate, reminderDate, paidDate, note) => {
  return db
    .query(
      "INSERT INTO bills (payee_id, user_id, amount, due_date, reminder_date, paid_date, note) VALUES ($1, (SELECT id FROM users WHERE auth0_sub = $2), $3, $4, $5, $6, $7) RETURNING *",
      [payeeId, auth0Sub, amount, dueDate, reminderDate, paidDate, note]
    )
    .then((data) => {
      return data.rows[0];
    });
};

const updateBill = (id, payeeId, auth0Sub, amount, dueDate, reminderDate, paidDate, note) => {
  return db
    .query(
      "UPDATE bills SET payee_id = $2, user_id = (SELECT id FROM users WHERE auth0_sub = $3), amount = $4, due_date = $5, reminder_date = $6, paid_date = $7, note = $8 WHERE id = $1 RETURNING *",
      [id, payeeId, auth0Sub, amount, dueDate, reminderDate, paidDate, note]
    )
    .then((data) => {
      return data.rows[0];
    });
};

const deleteBill = (id) => {
  return db.query("DELETE FROM bills WHERE id = $1", [id]);
};

const getBillsByCategory = (auth0Sub, categoryId) => {
  return db
    .query(
      "SELECT b.* FROM bills b JOIN users u ON b.user_id = u.id WHERE u.auth0_sub = $1 AND b.payee_id IN (SELECT id FROM payees WHERE category_id = $2)",
      [auth0Sub, categoryId]
    )
    .then((data) => {
      return data.rows;
    });
};

const getBillsUnpaid = (auth0Sub) => {
  return db
    .query(
      "SELECT b.* FROM bills b JOIN users u ON b.user_id = u.id WHERE u.auth0_sub = $1 AND b.paid_date IS NULL",
      [auth0Sub]
    )
    .then((data) => {
      return data.rows;
    });
};

const getBillsDue = (auth0Sub) => {
  return db
    .query(
      "SELECT b.* FROM bills b JOIN users u ON b.user_id = u.id WHERE u.auth0_sub = $1 AND b.due_date > CURRENT_DATE",
      [auth0Sub]
    )
    .then((data) => {
      return data.rows;
    });
};

const getBillsOverdue = (auth0Sub) => {
  return db
    .query(
      "SELECT b.* FROM bills b JOIN users u ON b.user_id = u.id WHERE u.auth0_sub = $1 AND b.due_date < CURRENT_DATE",
      [auth0Sub]
    )
    .then((data) => {
      return data.rows;
    });
};

const getBillsByDate = (auth0Sub, startDate, endDate) => {
  return db
    .query(
      "SELECT b.* FROM bills b JOIN users u ON b.user_id = u.id WHERE u.auth0_sub = $1 AND b.due_date >= $2 AND b.due_date <= $3",
      [auth0Sub, startDate, endDate]
    )
    .then((data) => {
      return data.rows;
    });
};

const getBillsByCategoryTotal = (auth0Sub, categoryId) => {
  return db
    .query(
      "SELECT SUM(b.amount) AS total_amount FROM bills b JOIN users u ON b.user_id = u.id WHERE u.auth0_sub = $1 AND b.payee_id IN (SELECT id FROM payees WHERE category_id = $2)",
      [auth0Sub, categoryId]
    )
    .then((data) => {
      return data.rows[0].total_amount || 0;
    });
};

const getBillsUnpaidTotal = (auth0Sub) => {
  return db
    .query(
      "SELECT SUM(amount) AS total_amount FROM bills WHERE user_id = (SELECT id FROM users WHERE auth0_sub = $1) AND paid_date IS NULL",
      [auth0Sub]
    )
    .then((data) => {
      return data.rows[0].total_amount || 0;
    });
};

const getBillsDueTotal = (auth0Sub) => {
  return db
    .query(
      "SELECT SUM(amount) AS total_amount FROM bills WHERE user_id = (SELECT id FROM users WHERE auth0_sub = $1) AND due_date >= CURRENT_DATE",
      [auth0Sub]
    )
    .then((data) => {
      return data.rows[0].total_amount || 0;
    });
};

const getBillsOverdueTotal = (auth0Sub) => {
  return db
    .query(
      "SELECT SUM(amount) AS total_amount FROM bills WHERE user_id = (SELECT id FROM users WHERE auth0_sub = $1) AND due_date < CURRENT_DATE",
      [auth0Sub]
    )
    .then((data) => {
      return data.rows[0].total_amount || 0;
    });
};

const getBillsByDateTotal = (auth0Sub, startDate, endDate) => {
  return db
    .query(
      "SELECT SUM(amount) AS total_amount FROM bills WHERE user_id = (SELECT id FROM users WHERE auth0_sub = $1) AND due_date >= $2 AND due_date <= $3",
      [auth0Sub, startDate, endDate]
    )
    .then((data) => {
      return data.rows[0].total_amount || 0;
    });
};

module.exports = { 
  getBills, 
  getBillById, 
  addBill, 
  updateBill, 
  deleteBill, 
  getBillsByCategory, 
  getBillsUnpaid, 
  getBillsDue, 
  getBillsOverdue, 
  getBillsByDate,
  getBillsByCategoryTotal,
  getBillsUnpaidTotal,
  getBillsDueTotal,
  getBillsOverdueTotal,
  getBillsByDateTotal
};
