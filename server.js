const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const genreRoutes = require("./routes/genreRoutes");
const exchangeRoutes = require("./routes/exchangeRoutes");
const postRoutes = require("./routes/postRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const dotenv = require("dotenv");
const path = require("path");

const cors = require("cors");
const { identifyUser } = require("./middlewares/identifyUser");
app.use(cors());
app.use(express.json());

dotenv.config();
require("./db");

app.get("/", (req, res) => res.send("Server is up and running"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/user", identifyUser, userRoutes);
app.use("/book", identifyUser, bookRoutes);
app.use("/genre", identifyUser, genreRoutes);
app.use("/exchange", identifyUser, exchangeRoutes);
app.use("/blog", identifyUser, postRoutes);
app.use("/category", identifyUser, categoriesRoutes);


app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server started on port ", port);
});
