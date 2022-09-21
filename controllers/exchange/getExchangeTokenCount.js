const errorHandler = require("../../utils/errorHandler");
const User = require("../../models/User");

exports.getExchangeTokenCount = async (req, res) => {
  try {
    const { user } = await req;
    const foundUser = await User.findById(user._id);
    const count = foundUser.getExchangeTokenCount();
    res.json({ count });
  } catch (err) {
    errorHandler({ err, res });
  }
};
