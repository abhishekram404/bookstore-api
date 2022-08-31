const { checkAuth } = require("../middlewares/checkAuth");
const { getAllBooks } = require("../controllers/book/getAllBooks");
const { addBook } = require("../controllers/book/addBook");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Book routes");
});

router.get("/all", checkAuth, getAllBooks);
router.post("/new", checkAuth, addBook);

module.exports = router;
