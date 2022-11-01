const { checkAuth } = require("../middlewares/checkAuth");
const { getAllBooks } = require("../controllers/book/getAllBooks");
const { addBook } = require("../controllers/book/addBook");
const multer = require("multer");
const storage = require("../utils/multerStorage");
const { getMyBooks } = require("../controllers/book/getMyBooks");
const { getExchangedBooks } = require("../controllers/book/getExchangedBooks");
const { getBook } = require("../controllers/book/getBook");
const { searchBook } = require("../controllers/book/searchBook");
const { releaseBook } = require("../controllers/exchange/releaseBook");
const { identifyUser } = require("../middlewares/identifyUser");
const { addBuyBook } = require("../controllers/book/addBuyBook");
const { getBuyBook } = require("../controllers/book/getBuyBook");
const { getAllBuyBooks } = require("../controllers/book/getAllBuyBooks");
const upload = multer({ dest: "uploads/", storage });

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Book routes");
});

router.patch("/release", checkAuth, releaseBook);
router.post("/search", searchBook);
router.get("/buy/all", getAllBuyBooks);
router.get("/all", getAllBooks);

router.get("/mine", checkAuth, getMyBooks);
router.get("/exchanged", checkAuth, getExchangedBooks);
router.post("/new", checkAuth, upload.single("cover"), addBook);
router.post("/newBuy", checkAuth, upload.single("cover"), addBuyBook);
router.get("/:bookId", identifyUser, getBook);
router.get("/buy/:bookId", identifyUser, getBuyBook);



module.exports = router;
