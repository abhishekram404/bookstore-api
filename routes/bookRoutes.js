const { checkAuth } = require("../middlewares/checkAuth");
const { getAllBooks } = require("../controllers/book/getAllBooks");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Book routes");
});

router.get("/all", checkAuth, getAllBooks);

module.exports = router;
