import {Router} from "express";
import {createTestReport, getTestReport, updateTestReport} from "../controllers/testReport.controllers.js";
import verifyJWT from "../controllers/auth.controllers.js";

const testReportRouter = Router();

testReportRouter.route("/:testReportId").get(verifyJWT, getTestReport);
testReportRouter.route("/create").post(verifyJWT, createTestReport);
testReportRouter.route("/update/:testReportId").post(verifyJWT, updateTestReport);

export default testReportRouter;