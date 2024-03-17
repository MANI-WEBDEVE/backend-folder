// const express = require("express");
import express from "express";
const app = express();
const port = 3000;
import mongoose from "mongoose";
import { Todo } from "./module/Todo.js";
// mongoose connect karna ka tarika
const conn = await mongoose.connect("mongodb://localhost:27017/");
app.get("/", (req, res) => {
  const todo = new Todo({
    title: "harry,",
    desc: "whats is behaviour",
    isDone: true,
    days: 10,
  });
  todo.save();
  res.send("Hello World!");
  s;
});
app.get("/a", async (req, res) => {
  let todo = await Todo.findOne({});
  res.json({ title: todo.title, desc: todo.desc });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
