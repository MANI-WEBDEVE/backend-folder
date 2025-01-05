import { Router } from "express";
import { checkAuthenticated, loginUser, logoutUser, resgisterUser } from "../controllers/user.controllers.js";

let routes = Router();

routes.route("/register").post(resgisterUser)
routes.route("/login").post(loginUser)
routes.route("/logout").post(logoutUser)
routes.route("/user-auth-check").get(checkAuthenticated)
export default routes;