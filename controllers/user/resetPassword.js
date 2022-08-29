const User = require("../../models/User");

exports.resetPassword = async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     if (!email || !password) {
  //       return res.status(400).send({
  //         success: false,
  //         message: "Email and password both must be included.",
  //         data: null,
  //       });
  //     }
  //     const foundUser = await User.findOne({ email: email.trim() });
  //     if (!foundUser) {
  //       return res.status(400).send({
  //         success: false,
  //         message: "No user having the provided email was found.",
  //         data: null,
  //       });
  //     }
  //     foundUser.password = password;
  //     foundUser.save();
  //     return res.status(200).send({
  //       success: true,
  //       message: "Password reset successful.",
  //       data: null,
  //     });
  //   } catch (error) {
  //     errorHandler({ error, res });
  //   }
};
