const { getPost } = require("../controllers/blog/getPost");
const { createPost } = require("../controllers/blog/createPost");
const { deletePost } = require("../controllers/blog/deletePost");
const { updatePost } = require("../controllers/blog/updatePost");
const { getAllPosts } = require("../controllers/blog/getAllPosts");
const router = require("express").Router();
const multer = require("multer");
const storage = require("../utils/multerStorage");
const { checkAuth } = require("../middlewares/checkAuth");

const upload = multer({ dest: "uploads/", storage });

// router.get("/", (req, res) => {
//     res.send("Blog Post routes");
//   });

// create new post
router.post("/new", checkAuth, upload.single("photo"), createPost);

// update post
router.put("/:id", updatePost);

// delete post
router.delete("/:id", deletePost);

// fetch post
router.get("/:id", getPost);

// fetch all posts
router.get("/", getAllPosts);

module.exports = router;