const express = require("express");
const app = express();
const port = 5000;
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/", (res, req) => {
  res.send("hello testing bugs API");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
