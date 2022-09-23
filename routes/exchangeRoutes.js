const { exchangeBook } = require("../controllers/exchange/exhangeBook");
const {
  getExchangeTokenCount,
} = require("../controllers/exchange/getExchangeTokenCount");
const { checkAuth } = require("../middlewares/checkAuth");

const router = require("express").Router();

router.post("/", checkAuth, exchangeBook);
router.get("/token-count", checkAuth, getExchangeTokenCount);

module.exports = router;
