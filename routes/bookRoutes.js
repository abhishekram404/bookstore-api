const { checkAuth } = require("../middlewares/checkAuth");
const { getAllBooks } = require("../controllers/book/getAllBooks");
const { addBook } = require("../controllers/book/addBook");
const path = require("path");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalName);
  },
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});
const upload = multer({ dest: "uploads/", storage });

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Book routes");
});

router.get("/all", checkAuth, getAllBooks);
router.post("/new", checkAuth, upload.single("cover"), addBook);

module.exports = router;
