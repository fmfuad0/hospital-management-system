import {Router} from 'express';
import {createPrescription, getPrescription, updatePrescription} from "../controllers/prescription.controllers.js";
import verifyJWT from "../controllers/auth.controllers.js";

const prescriptionRouter = Router();
prescriptionRouter.route('/:prescriptionId').get(verifyJWT, getPrescription)
prescriptionRouter.route('/create').post(verifyJWT, createPrescription)
prescriptionRouter.route('/update/:prescriptionId').post(verifyJWT, updatePrescription)


export default prescriptionRouter;