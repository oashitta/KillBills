const express = require("express");
const router = express.Router();
const bills = require("../db/queries/bills");

// GET /bills
router.get("/", (req, res) => {
  bills.getBills().then((data) => {
    res.json({ bills: data });
  });
});

// POST /bills
router.post("/", (req, res) => {
  const { payeeId, userId, amount, dueDate, reminderDate, paidDate, note } = req.body;
  bills.addBill(payeeId, userId, amount, dueDate, reminderDate, paidDate, note).then((data) => {
    res.json({ bill: data });
  });
});

// PUT /bills/:id
router.put("/:id", (req, res) => {
  const billId = req.params.id;
  const { payeeId, userId, amount, dueDate, reminderDate, paidDate, note } = req.body;
  bills.updateBill(billId, payeeId, userId, amount, dueDate, reminderDate, paidDate, note).then((data) => {
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

// GET /bills/category/total
router.get("/category/total", (req, res) => {
  bills.getBillsByCategoryTotal().then((data) => {
    res.json({ total: data });
  });
});

// GET /bills/unpaid/total
router.get("/unpaid/total", (req, res) => {
  bills.getBillsUnpaidTotal().then((data) => {
    res.json({ total: data });
  });
});

// GET /bills/due/total
router.get("/due/total", (req, res) => {
  bills.getBillsDueTotal().then((data) => {
    res.json({ total: data });
  });
});

// GET /bills/overdue/total
router.get("/overdue/total", (req, res) => {
  bills.getBillsOverdueTotal().then((data) => {
    res.json({ total: data });
  });
});

// GET /bills/date/total
router.get("/date/total", (req, res) => {
  bills.getBillsByDateTotal().then((data) => {
    res.json({ total: data });
  });
});

// GET /bills/:id
router.get("/:id", (req, res) => {
  const billId = req.params.id;
  bills.getBillById(billId).then((data) => {
    res.json({ bill: data });
  });
});

// GET /bills/category/:id
router.get("/category/:id", (req, res) => {
  const categoryId = req.params.id;
  bills.getBillsByCategory(categoryId).then((data) => {
    res.json({ bills: data });
  });
});

// GET /bills/unpaid
router.get("/unpaid", (req, res) => {
  bills.getBillsUnpaid().then((data) => {
    res.json({ bills: data });
  });
});

// GET /bills/due
router.get("/due", (req, res) => {
  bills.getBillsDue().then((data) => {
    res.json({ bills: data });
  });
});

// GET /bills/overdue
router.get("/overdue", (req, res) => {
  bills.getBillsOverdue().then((data) => {
    res.json({ bills: data });
  });
});

// GET /bills/date
router.get("/date", (req, res) => {
  bills.getBillsByDate().then((data) => {
    res.json({ bills: data });
  });
});

module.exports = router;
