
const router = require("express").Router();
const { checkAuth } = require("../middlewares/checkAuth");
const { confirmOrder } = require("../controllers/order/confirmOrder");



// fetch post
router.post("/new", confirmOrder);



module.exports = router;