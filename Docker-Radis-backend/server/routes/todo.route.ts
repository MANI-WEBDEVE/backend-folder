import { Router } from "express";

import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controllers.js";
import isAuthenticated  from "../middleware/isAuthenticated.middleware.js";

let todoRoutes = Router();

todoRoutes.route("/").post(isAuthenticated,createTodo).get(getTodos);
todoRoutes.route("/:todoId").put(isAuthenticated,updateTodo).delete(isAuthenticated,deleteTodo);

export default todoRoutes;