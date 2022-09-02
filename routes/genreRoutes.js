const { getAllGenres } = require("../controllers/genre/getAllGenres");

const router = require("express").Router();

router.get("/", getAllGenres);

module.exports = router;
