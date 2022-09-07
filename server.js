const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const genreRoutes = require("./routes/genreRoutes");
const dotenv = require("dotenv");
const path = require("path");

const cors = require("cors");
app.use(cors());
app.use(express.json());

dotenv.config();
require("./db");

app.get("/", (req, res) => res.send("Server is up and running"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/user", userRoutes);
app.use("/book", bookRoutes);
app.use("/genre", genreRoutes);

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server started on port ", port);
});
