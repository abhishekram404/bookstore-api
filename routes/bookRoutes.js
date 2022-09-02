const { checkAuth } = require("../middlewares/checkAuth");
const { getAllBooks } = require("../controllers/book/getAllBooks");
const { addBook } = require("../controllers/book/addBook");
const multer = require("multer");
const storage = require("../utils/multerStorage");
const upload = multer({ dest: "uploads/", storage });

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Book routes");
});

router.get("/all", checkAuth, getAllBooks);
router.post("/new", checkAuth, upload.single("cover"), addBook);

module.exports = router;
