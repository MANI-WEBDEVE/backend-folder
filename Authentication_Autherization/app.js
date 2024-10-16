import cookieParser from "cookie-parser";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const app = express();

app.use(cookieParser());

//! how to password Encrypt and decrypt user password
app.get("/", (req, res) => {
  //* set the cookie
  res.cookie("name", "Muhammad");
  // console.log(na.cookie)
  res.send("done");
  bcrypt.genSalt(10, function (err, salt) {
    console.log(`saltString: ${salt}`);
    bcrypt.hash("Inam", salt, (e, hash) => {
      console.log(`Hash: ${hash}`);
    });
  });
  bcrypt.compare(
    "Inam",
    "$2b$10$p9kvdeHqcUAyiwB9A.S1ieK0UP7VH8S2dZZ6W0gFVItbtl8IsziQy",
    function (err, result) {
      console.log(result);
    }
  );
});

//! JsonWebToken and how to use

app.get("/token", (req, res) => {
  let token = jwt.sign({ email: "MuhammadInam@gmail.com" }, "inam");
  console.log(token);
  res.cookie("Inam", token);
  res.send("TOKEN");
});

//* agar ap ko console per cookie dekhnie ha tu ak package ha cookie-parser us ko install and use karna hoga

app.get("/read", (req, res) => {
  console.log(req.cookies.Inam);
  //! And how to extract data from cookie
  let data = jwt.verify(req.cookies.Inam, "inam");
  console.log(data);

  res.send("done Reading");
});

app.get("/cookie", (req, res) => {
  // console.log(res.cookie("jokar", '1212121121'))
  res.send("done");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
