import { Router } from "express";
import { loginUser, resgisterUser } from "../controllers/user.controllers.js";

let routes = Router();

routes.route("/register").post(resgisterUser)
routes.route("/login").post(loginUser)
export default routes;