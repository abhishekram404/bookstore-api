const {
  getExchangeTokenCount,
} = require("../controllers/exchange/getExchangeTokenCount");
const { checkAuth } = require("../middlewares/checkAuth");

const router = require("express").Router();

router.get("/token-count", checkAuth, getExchangeTokenCount);

module.exports = router;
