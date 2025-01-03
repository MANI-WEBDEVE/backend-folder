import { Router } from "express";
import { loginUser, logoutUser, resgisterUser } from "../controllers/user.controllers.js";

let routes = Router();

routes.route("/register").post(resgisterUser)
routes.route("/login").post(loginUser)
routes.route("/logout").post(logoutUser)
export default routes;