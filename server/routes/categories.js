const express = require("express");
const router = express.Router();
const categories = require("../db/queries/categories");

// GET /categories
router.get("/", (req, res) => {
  categories.getCategories().then((data) => {
    res.json({ categories: data });
  });
});

// GET /categories/:id
router.get("/:id", (req, res) => {
  const categoryId = req.params.id;
  categories.getCategoryById(categoryId).then((data) => {
    res.json({ category: data });
  });
});

module.exports = router;
