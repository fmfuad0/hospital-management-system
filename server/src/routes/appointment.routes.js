import express from "express";
import {createAppointment, setAppointmentStatus, updateAppointment} from "../controllers/appointment.conrollers.js";
import verifyJWT from "../controllers/auth.controllers.js";

const appointmentRouter = express.Router();

appointmentRouter.route('/').get((req, res) => {return res.send("Appointment")});
appointmentRouter.route('/create').post(verifyJWT, createAppointment);
appointmentRouter.route('/toggle/:appointmentId/:status').get(verifyJWT, setAppointmentStatus);
appointmentRouter.route('/update/:appointmentId').post(verifyJWT,updateAppointment);

export default appointmentRouter;