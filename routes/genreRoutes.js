const { createGenre } = require("../controllers/genre/createGenre");
const { getAllGenres } = require("../controllers/genre/getAllGenres");

const router = require("express").Router();

router.get("/", getAllGenres);
router.post("/new", createGenre);

module.exports = router;
