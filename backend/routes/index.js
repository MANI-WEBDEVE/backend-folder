var express = require("express");
var router = express.Router();
const userModel = require("./users");

router.get("/", function (req, res) {
  res.render("index");
});
router.get("/create", async function (req, res) {
  let userdata = await userModel.create({
    username: "muzzamil",
    nickname: "muna",
    description: "muna is very badly thing and very bad work is world",
    categories: ["smoking", "drugs", "watch  snufe movie"],
  });
  res.send(userdata);
});

router.get("/find", async function (req, res) {
  let regex = new RegExp("^MUZZAMIL$", "i");
  let user = await userModel.find({ username: regex });
  res.send(user);
});

router.get("/find", async function (req, res) {
  let date1 = new Date("2023-12-15");
  let date2 = new Date("2023-12-16");
  let user = await userModel.find({
    datecreated: { $gte: date1, $lte: date2 },
  });
  // let user = await userModel.find({categories:{$all:["drugs"]}});
  res.send(user);
});

// //cresting cookie
// router.get("/", function(req, res){
//   res.cookie("age" , 18)
//   res.render("index")
// })

// //reading cookie
//  router.get("/read", function(req,res){
//   console.log(req.cookies.age);
//   res.send("check")
//  })
// // deleting cookie
// router.get("/delete", function(req,res){
//   res.clearCookie("age");
//   res.send("clear hogaye cookie")
// })

//create session
// router.get("/", function(req, res){
//   req.session.ban = true;
//   res.render("index")
// })

// read session
// router.get("/checkban", function(req, res){
//   if(req.session.ban === true){
//     res.send("your id is banned")
//   }else{
//     res.send("your banned remove it")
//   }
// })

//destroy session
// router.get("/removeban", function(rs, req){
//   req.session.destroy(function(err){
//     if(err) throw err;
//     res.send("ban removed")
//     console.log(destroy )
//   })
// })
//creation
// router.get("/create", async function(req, res){
//      const userinfo = await userModel.create({
//     username: "muhammadinam",
//     name:"inam",
//     age:18
//   })
//   res.send(userinfo)
// })
// //find
// router.get("/alluser", async function (req,res){
//   let alluser = await userModel.find();
//   res.send(alluser)
// })
// //findOne
// router.get("/findOne", async function (req,res){
//    let oneuser = await userModel.findOne({username:"muhammadinam"})
//    res.send(oneuser)
// })
//delete
// router.get("/delete", async function(req, res){
//   let deleteuser =await userModel.findOneAndDelete({
//     username: "muhammadinam"
//   })
//   res.send(deleteuser)
// })
// router.get()

module.exports = router;
