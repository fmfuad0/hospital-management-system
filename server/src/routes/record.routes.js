import express from 'express';
import {createRecord, getRecord, updateRecord} from "../controllers/record.controllers.js";
import verifyJWT from "../controllers/auth.controllers.js";

const recordRouter = express.Router();

recordRouter.route("/").get((req, res) => {res.send("Record")})
recordRouter.route("/create").post(verifyJWT, createRecord)
recordRouter.route("/:recordId").get(verifyJWT, getRecord)
recordRouter.route("/update/:recordId").post(verifyJWT, updateRecord)

export default recordRouter;
