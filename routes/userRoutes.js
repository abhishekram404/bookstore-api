const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const User = require("../models/User");

router.get("/", async (req, res) => {
  // res.send("User route");
  try {
    const users = await User.find({});
    return res.status(200).send({
      success: true,
      message: "All users fetched successfully",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
});

router.get("/:userId", async (req, res) => {
  console.log(typeof req.params.userId);
  try {
    const user = await User.find({
      _id: mongoose.Types.ObjectId(req.params.userId.toString()),
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "The requested user was not found.",
        data: null,
      });
    }

    return res.status(200).send({
      success: true,
      message: "User was found.",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: "Something went wrong on the server side.",
      data: null,
    });
  }
});

// create new user
router.post("/", async (req, res) => {
  try {
    const { fullName, username, password, email, phone, address } =
      await req.body;

    let newUser = await User.create({
      fullName,
      username,
      password,
      email,
      phone,
      address,
    });

    return res.status(200).send({
      success: true,
      message: "User created",
      data: null,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: "Something went wrong while creating new user.",
      data: null,
    });
  }
});

module.exports = router;
