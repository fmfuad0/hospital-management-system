import express from 'express';
import {registerDoctor} from "../controllers/doctor.controllers.js";
import verifyJWT from "../controllers/auth.controllers.js";

const doctorRouter = express.Router();

doctorRouter.route("/").get((req, res)=>res.send("Doctor"))
doctorRouter.route("/register/:employeeId").post(verifyJWT, registerDoctor)


export default doctorRouter;