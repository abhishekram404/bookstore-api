const router = require("express").Router();
const userController = require("../controllers/userController");

// fetch all users
router.get("/", userController.getAllUsers);

// fetch user by id
router.get("/:userId", userController.getUser);

// create new user
router.post("/register", userController.register);

// login user
router.post("/login", userController.login);

module.exports = router;
