var figlet = require("figlet");
figlet("TAHIR", function (err, data) {
  if (err) {
    console.log("something erroe");
    console.dir(err);
    return;
  }
  console.log(data);
});
router.get("/", function (req, res) {
  res.send("INDEX.EJS");
});
