const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/practice")

// const userschema = mongoose.Schema({
//   username: String,
//   name: String,
//   age: Number,
// })


const userSchema = mongoose.Schema({
  username:String,
  nikename:String,
  description:String,
  categories:{
    type: Array,
    default: []
  },
  datecreated:{
    type:Date,
    default: Date.now()
  }
})
module.exports = mongoose.model("user", userSchema ) 