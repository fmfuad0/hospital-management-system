import {Router} from "express";
import {loginAdmin, registerAdmin} from "../controllers/admin.controllers.js";

const adminRouter = new Router()
adminRouter.route("/").get((req,res)=>{res.send("Admin")})
adminRouter.route("/register").post(registerAdmin)
adminRouter.route("/login").post(loginAdmin)
adminRouter.route("/").get()

export default adminRouter;