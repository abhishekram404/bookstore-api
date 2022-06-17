const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Book routes");
});

module.exports = router;
