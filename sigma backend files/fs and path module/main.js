const { error } = require("console");
const fs = require("fs");
console.log("starting");
// fs.writeFileSync("json.txt", "json is a very good file informtion");

fs.writeFile("json2.txt", "write a json file", () => {
  fs.readFile("json2.txt", (error, data) => {
    console.log(error, data.toString());
    console.log("doning");
    fs.appendFile("json.txt", "mani is good boy", (e, d) => {
      console.log(d);
    });
  });
});
console.log("ending");
