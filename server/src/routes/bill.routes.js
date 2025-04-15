import express from 'express';
import {createBill, getAllBills, getBill, getBillsOfPatient} from "../controllers/bill.controllers.js";
import verifyJWT from "../controllers/auth.controllers.js";
const billRouter = express.Router();

billRouter.route("/").get((req, res) => {
    res.send("Bill");
})
billRouter.route("/create").post(verifyJWT, createBill)
billRouter.route("/:billId").get(verifyJWT, getBill)
billRouter.route("/*/all").get(verifyJWT, getAllBills)
billRouter.route("/patient/:patientId").get(verifyJWT, getBillsOfPatient)

export default billRouter;