import { Router } from "express";

import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controllers.js";

let todoRoutes = Router();

todoRoutes.route("/").post(createTodo).get(getTodos);
todoRoutes.route("/:todoId").put(updateTodo).delete(deleteTodo);

export default todoRoutes;