const router = require("express").Router();
const userController = require("../controllers/userController");

// fetch all users
router.get("/", userController.getAllUsers);

// fetch user by id
router.get("/:userId", userController.getUser);

// create new user
router.post("/", userController.register);

module.exports = router;
