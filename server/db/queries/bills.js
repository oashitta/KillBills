const db = require("../../configs/db.config");

const getBills = (auth0Sub) => {
  return db
    .query(
      `
      SELECT b.id, b.amount::money::numeric::float8, b.due_date, p.name AS payee_name, p.url AS payee_link, b.note
      FROM bills b 
      JOIN users u ON b.user_id = u.id 
      JOIN payees p ON b.payee_id = p.id 
      WHERE u.auth0_sub = $1 
      AND b.paid_date IS NULL
      `,
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

const getBillsByCategoryId = (auth0Sub, categoryId) => {
  return db
    .query(
      "SELECT b.* FROM bills b JOIN users u ON b.user_id = u.id WHERE u.auth0_sub = $1 AND b.payee_id IN (SELECT id FROM payees WHERE category_id = $2)",
      [auth0Sub, categoryId]
    )
    .then((data) => {
      return data.rows;
    });
};

const getBillsPaid = (auth0Sub) => {
  return db
    .query(
      `
      SELECT b.id, b.amount::money::numeric::float8, b.paid_date, p.name AS payee_name
      FROM bills b
      JOIN users u ON b.user_id = u.id
      JOIN payees p ON b.payee_id = p.id
      WHERE u.auth0_sub = $1
      AND b.paid_date IS NOT NULL
      ORDER BY b.paid_date DESC, p.name ASC;
    `,
      [auth0Sub]
    )
    .then((data) => {
      return data.rows;
    });
};

const getBillsUnpaid = (auth0Sub) => {
  return db
    .query(
      `
      SELECT b.*, p.name AS payee_name
      FROM bills b
      JOIN users u ON b.user_id = u.id
      JOIN payees p ON b.payee_id = p.id
      WHERE u.auth0_sub = $1
      AND b.paid_date IS NOT NULL;
    `,
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

const getBillsPaidTotal = (auth0Sub) => {
  return db
    .query(
      "SELECT SUM(amount) AS total_amount FROM bills WHERE user_id = (SELECT id FROM users WHERE auth0_sub = $1) AND paid_date IS NOT NULL",
      [auth0Sub]
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
      "SELECT SUM(amount) AS total_amount FROM bills WHERE user_id = (SELECT id FROM users WHERE auth0_sub = $1) AND due_date < CURRENT_DATE AND paid_date IS NULL",
      [auth0Sub]
    )
    .then((data) => {
      return data.rows[0].total_amount || 0;
    });
};

const getBillsOverdueCount = (auth0Sub) => {
  return db
    .query(
      "SELECT COUNT(*) AS total_count FROM bills WHERE user_id = (SELECT id FROM users WHERE auth0_sub = $1) AND due_date < CURRENT_DATE AND paid_date IS NULL",
      [auth0Sub]
    )
    .then((data) => {
      return data.rows[0].total_count || 0;
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

const getBillsByPayee = (auth0Sub) => {
  return db
    .query(
      `
      SELECT p.id, p.name,
      SUM(b.amount) AS total_amount
      FROM payees p
      JOIN bills b ON p.id = b.payee_id
      JOIN users u ON b.user_id = u.id
      WHERE u.auth0_sub = $1
      GROUP BY p.id, p.name;
    `,
      [auth0Sub]
    )
    .then((data) => {
      return data.rows;
    });
};

const getBillsByCategory = (auth0Sub) => {
  return db
    .query(
      `
      SELECT c.*, SUM(b.amount) AS total_amount
      FROM categories c
      JOIN payees p ON c.id = p.category_id
      JOIN bills b ON p.id = b.payee_id
      JOIN users u ON b.user_id = u.id
      WHERE u.auth0_sub = $1
      GROUP BY c.id;
    `,
      [auth0Sub]
    )
    .then((data) => {
      return data.rows;
    });
};

const getBillsByMonth = (auth0Sub) => {
  return db
    .query(
      `
      SELECT TO_CHAR(DATE_TRUNC('month', b.due_date), 'YYYY-MM') AS month_year, SUM(b.amount) AS total_amount
      FROM bills b
      JOIN users u ON b.user_id = u.id
      WHERE u.auth0_sub = $1 AND b.due_date >= CURRENT_DATE - INTERVAL '1 year'
      GROUP BY month_year
      ORDER BY month_year;
    `,
      [auth0Sub]
    )
    .then((data) => {
      return data.rows;
    });
};

const getBillNextDate = (auth0Sub) => {
  return db
    .query(
      `
      SELECT 
        DATE_PART('day', CAST(b.due_date AS TIMESTAMP) - CURRENT_DATE) AS days
      FROM
        bills b
      JOIN
        users u ON b.user_id = u.id
      JOIN
        payees p ON b.payee_id = p.id
      WHERE
        u.auth0_sub = $1
        AND b.paid_date IS NULL
        AND b.due_date >= CURRENT_DATE
      ORDER BY
        b.due_date ASC
      LIMIT 1;
    `,
      [auth0Sub]
    )
    .then((data) => {
      return data.rows[0].days || 0;
    });
};

const getBillsUnpaidDates = (auth0Sub) => {
  return db
    .query(
      `
      SELECT DISTINCT due_date
      FROM bills b
      JOIN users u ON b.user_id = u.id
      WHERE u.auth0_sub = $1
      AND b.paid_date IS NULL
      AND b.due_date >= CURRENT_DATE;
    `,
      [auth0Sub]
    )
    .then((data) => {
      return data.rows;
    });
};

const getBillsPaidDates = (auth0Sub) => {
  return db
    .query(
      `
      SELECT DISTINCT due_date
      FROM bills b
      JOIN users u ON b.user_id = u.id
      WHERE u.auth0_sub = $1
      AND b.paid_date IS NOT NULL;
    `,
      [auth0Sub]
    )
    .then((data) => {
      return data.rows;
    });
};

const getBillsOverdueDates = (auth0Sub) => {
  return db
    .query(
      `
      SELECT DISTINCT due_date
      FROM bills b
      JOIN users u ON b.user_id = u.id
      WHERE u.auth0_sub = $1
      AND b.paid_date IS NULL
      AND b.due_date < CURRENT_DATE;
    `,
      [auth0Sub]
    )
    .then((data) => {
      return data.rows;
    });
};

module.exports = { 
  getBills, 
  getBillById, 
  addBill, 
  updateBill, 
  deleteBill, 
  getBillsByCategoryId, 
  getBillsPaid, 
  getBillsUnpaid, 
  getBillsDue, 
  getBillsOverdue, 
  getBillsByDate, 
  getBillsByCategoryTotal, 
  getBillsPaidTotal, 
  getBillsUnpaidTotal, 
  getBillsDueTotal, 
  getBillsOverdueTotal, 
  getBillsOverdueCount, 
  getBillsByDateTotal, 
  getBillsByPayee, 
  getBillsByCategory, 
  getBillsByMonth,
  getBillNextDate,
  getBillsUnpaidDates, 
  getBillsPaidDates, 
  getBillsOverdueDates
};
