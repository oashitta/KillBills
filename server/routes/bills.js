const express = require("express");
const router = express.Router();
const bills = require("../db/queries/bills");
const users = require("../db/queries/users");
const db = require("../configs/db.config");

// GET /bills
router.get("/", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBills(auth0Sub).then((data) => {
    res.json({ bills: data });
  });
});

// POST /bills
router.post("/", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  const { payeeId, amount, dueDate, reminderDate, paidDate, note } = req.body;
  bills
    .addBill(payeeId, auth0Sub, amount, dueDate, reminderDate, paidDate, note)
    .then((data) => {
      res.json({ bill: data });
    });
});

// PUT /bills/:id
router.put("/:id", (req, res) => {
  const billId = req.params.id;
  const auth0Sub = req.auth.payload.sub;
  const { payeeId, amount, dueDate, reminderDate, paidDate, note } = req.body;
  bills
    .updateBill(
      billId,
      payeeId,
      auth0Sub,
      amount,
      dueDate,
      reminderDate,
      paidDate,
      note
    )
    .then((data) => {
      res.json({ bill: data });
    });
});

// DELETE /bills/:id
router.delete("/:id", (req, res) => {
  const billId = req.params.id;
  bills.deleteBill(billId).then(() => {
    res.sendStatus(204);
  });
});

// GET /bills/count
router.get("/count", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsCount(auth0Sub).then((data) => {
    res.json({ count: data });
  });
});

// GET /bills/category/total
router.get("/category/total", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  const categoryId = req.query.categoryId;
  bills.getBillsByCategoryTotal(auth0Sub, categoryId).then((data) => {
    res.json({ total: data });
  });
});

// GET /bills/paid/total
router.get("/paid/total", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsPaidTotal(auth0Sub).then((data) => {
    res.json({ total: data });
  });
});

// GET /bills/unpaid/total
router.get("/unpaid/total", async (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  try {
    const userExists = await users.checkUserExists(auth0Sub);   
    if (!userExists) {
      await users.addUser(auth0Sub);
    }
    bills.getBillsUnpaidTotal(auth0Sub).then((data) => {
      res.json({ total: data });
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to process the request" });
  }
});

// GET /bills/due/total
router.get("/due/total", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsDueTotal(auth0Sub).then((data) => {
    res.json({ total: data });
  });
});

// GET /bills/overdue/total
router.get("/overdue/total", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsOverdueTotal(auth0Sub).then((data) => {
    res.json({ total: data });
  });
});

// GET /bills/overdue/count
router.get("/overdue/count", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsOverdueCount(auth0Sub).then((data) => {
    res.json({ count: data });
  });
});

// GET /bills/date/total
router.get("/date/total", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  bills.getBillsByDateTotal(auth0Sub, startDate, endDate).then((data) => {
    res.json({ total: data });
  });
});

// GET /bills/category/:id
router.get("/category/:id", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  const categoryId = req.params.id;
  bills.getBillsByCategory(auth0Sub, categoryId).then((data) => {
    res.json({ bills: data });
  });
});

// GET /bills/paid
router.get("/paid", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsPaid(auth0Sub).then((data) => {
    res.json({ bills: data });
  });
});

// GET /bills/unpaid
router.get("/unpaid", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsUnpaid(auth0Sub).then((data) => {
    res.json({ bills: data });
  });
});

// GET /bills/due
router.get("/due", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsDue(auth0Sub).then((data) => {
    res.json({ bills: data });
  });
});

// GET /bills/overdue
router.get("/overdue", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsOverdue(auth0Sub).then((data) => {
    res.json({ bills: data });
  });
});

// GET /bills/overdue/count
router.get("/overdue", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsOverdue(auth0Sub).then((data) => {
    res.json({ bills: data });
  });
});

// GET /bills/date
router.get("/date", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  bills.getBillsByDate(auth0Sub, startDate, endDate).then((data) => {
    res.json({ bills: data });
  });
});

// GET /bills/payee
router.get("/payee", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsByPayee(auth0Sub).then((data) => {
    res.json({ payees: data });
  });
});

// GET /bills/category
router.get("/category", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsByCategory(auth0Sub).then((data) => {
    res.json({ categories: data });
  });
});

// GET /bills/month
router.get("/month", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsByMonth(auth0Sub).then((data) => {
    res.json({ months: data });
  });
});

// GET /bills/year
router.get("/year", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsByYear(auth0Sub).then((data) => {
    res.json({ years: data });
  });
});

// GET /bills/next/days
router.get("/next/days", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillNextDate(auth0Sub).then((data) => {
    res.json({ days: data });
  });
});

// GET /bills/unpaid/udates
router.get("/unpaid/dates", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsUnpaidDates(auth0Sub).then((data) => {
    const billsUnpaidDates = data.map((row) => (row.due_date ? row.due_date.toISOString().split("T")[0] : null));
    res.json({ billsUnpaidDates });
  });
});

// GET /bills/paid/dates
router.get("/paid/dates", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsPaidDates(auth0Sub).then((data) => {
    const billsPaidDates = data.map((row) => (row.due_date ? row.due_date.toISOString().split("T")[0] : null));
    res.json({ billsPaidDates });
  });
});

// GET /bills/overdue/dates
router.get("/overdue/dates", (req, res) => {
  const auth0Sub = req.auth.payload.sub;
  bills.getBillsOverdueDates(auth0Sub).then((data) => {
    const billsOverdueDates = data.map((row) => (row.due_date ? row.due_date.toISOString().split("T")[0] : null));
    res.json({ billsOverdueDates });
  });
});

// GET /bills/:id
router.get("/:id", (req, res) => {
  const billId = req.params.id;
  bills.getBillById(billId).then((data) => {
    res.json({ bill: data });
  });
});

module.exports = router;
