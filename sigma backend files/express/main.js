const express = require("express");
const app = express();
const port = 3000;
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render(index);
});
app.get("/blog/:slug", (req, res) => {
  //http://localhost:3000/blog/helooooooooooooooooooooooooooo?dark?web
  console.log(req.params); //{ slug: 'helooo }
  console.log(req.query); //{ 'dark?web': '' }
  res.send(`this web world hey ${req.params.slug}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
