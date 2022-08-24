const router = require("express").Router();
const { getAllUsers } = require("../controllers/user/getAllUsers");
const { getUser } = require("../controllers/user/getUser");
const { register } = require("../controllers/user/register");
const { login } = require("../controllers/user/login");
const { verify } = require("../controllers/user/verify");
const { resendOTP } = require("../controllers/user/resendOTP");

console.log(getAllUsers);

// fetch all users
router.get("/", getAllUsers);

// fetch user by id
router.get("/:userId", getUser);

// create new user
router.post("/register", register);

// login user
router.post("/login", login);

// verify email
router.post("/verify", verify);

// resend otp
router.get("/resend-verification-otp/:email", resendOTP);

module.exports = router;
