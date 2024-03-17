const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Employee = require("./models/Employee");
const port = 3000;
//-----
mongoose.connect("mongodb://127.0.0.1:27017/company");
//method connect mongoose
//ejs setup engine'
app.set("view engine", "ejs");
//now write a function random selection information
const getRandom = (arr) => {
  let raninfo = Math.floor(Math.random() * (arr.length - 1));
  return arr[raninfo];
};
//---------------
app.get("/", async (req, res) => {
  res.send("hello world");
});

app.get("/generate", async (req, res) => {
  //clear the employee data
  await Employee.deleteMany({});
  for (let index = 0; index < 10; index++) {
    //method how generate data
    let randomNames = ["inam", "tahir", "saad", "sharjeel"];
    let randomcities = ["lahore", "karachi", "hydarbad", "kashmir"];
    let randomLanguage = ["python", "java", "javascript", "Typescript"];
    let e = await Employee.create({
      name: getRandom(randomNames),
      language: getRandom(randomLanguage),
      isEnginner: Math.random() > 0.5 ? true : false,
      package: Math.floor(Math.random() * 45000),
      city: getRandom(randomcities),
    });
    console.log(e);
  }
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
