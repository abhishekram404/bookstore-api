const { getAllCategories } = require("../controllers/categories/getAllCategories");
const { createCategory } = require("../controllers/categories/createCategory");

const router = require("express").Router();

//Create new category
router.post("/new", createCategory);

//Get all categories
router.get("/", getAllCategories)

module.exports = router;
