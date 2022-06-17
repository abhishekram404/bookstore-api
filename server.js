const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");

dotenv.config();

require("./db");
app.use(express.json());
app.get("/", (req, res) => res.send("Server is up and running"));

app.use("/book", bookRoutes);
app.use("/user", userRoutes);

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server started on port ", port);
});
