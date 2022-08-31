const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
exports.checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized request",
        data: null,
      });
    }
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized request",
        data: null,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({
        success: false,
        message: "Session expired! Please login again.",
        data: null,
      });
    }
    errorHandler({ error, res });
  }
};
