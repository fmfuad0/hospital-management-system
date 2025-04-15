import express from "express";
import {getMedicalRecords, getPatientInfo, registerPatient, updatePatient} from "../controllers/patient.controllers.js";
import verifyJWT from "../controllers/auth.controllers.js";

const patientRouter = express.Router();

patientRouter.route("/:patientId").get(verifyJWT, getPatientInfo)
patientRouter.route("/register").post(verifyJWT, registerPatient)
patientRouter.route("/update/:patientId").post(verifyJWT, updatePatient)
patientRouter.route("/medical-records/:patientId").get(verifyJWT, getMedicalRecords)


export default patientRouter