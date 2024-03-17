const express = require("express");
const app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  throw Error("something wrong");
});
app.get("/contact", function (req, res) {
  res.render("contact");
});
app.get("/error", function (req, res, next) {
  throw Error("this is error");
});
app.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});

app.listen(3000);

// const express = require("exprses")
// const app = express
