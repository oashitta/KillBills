const express = require("express");
const router = express.Router();
const payees = require("../db/queries/payees");

// GET /payees
router.get("/", (req, res) => {
  payees.getPayees().then((data) => {
    res.json({ payees: data });
  });
});

// GET /payees/:id
router.get("/:id", (req, res) => {
  const payeeId = req.params.id;
  payees.getPayeeById(payeeId).then((data) => {
    res.json({ payee: data });
  });
});

// POST /payees
router.post("/", (req, res) => {
  const { name, url, accountNumber, isHidden, categoryId } = req.body;
  payees.addPayee(name, url, accountNumber, isHidden, categoryId).then((data) => {
    res.json({ payee: data });
  });
});

// PUT /payees/:id
router.put("/:id", (req, res) => {
  const payeeId = req.params.id;
  const { name, url, accountNumber, isHidden, categoryId } = req.body;
  payees.updatePayee(payeeId, name, url, accountNumber, isHidden, categoryId).then((data) => {
    res.json({ payee: data });
  });
});

module.exports = router;
