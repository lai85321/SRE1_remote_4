require("dotenv").config();
const express = require("express");
const app = express();
const { PORT } = process.env;

app.use("/api", [require("./route")]);
// Error handling
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`Server is working on ${PORT}`);
});

module.exports = app;
