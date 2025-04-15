import express from 'express';
import {registerEmployee} from "../controllers/employee.controllers.js";
import verifyJWT from "../controllers/auth.controllers.js";

const employeeRouter = express.Router();

employeeRouter.route("/").get
((req,res)=>{res.send("Employee")});

employeeRouter.route("/register").post(verifyJWT, registerEmployee);

export default employeeRouter;