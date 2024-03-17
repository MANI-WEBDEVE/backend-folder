import fs from "fs/promises";
let a = await fs.readFile("json.txt");
let b = await fs.writeFile("json3.txt", "who am i am now am look at", () => {
  console.log("doning");
  let c = fs.readFile("json3.txt", (e, d) => {
    console.log(e, d.toString());
    console.log(c);
  });
});
console.log(a.toString());
