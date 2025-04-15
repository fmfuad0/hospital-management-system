import connectDB from "./server/src/database/connectDatabase.js";
import dotenv from "dotenv";
import express  from "express";
import cors from "cors";
import {apiError} from "./server/src/utils/apiError.js";
import patientRouter from "./server/src/routes/patient.routes.js";
import employeeRouter from "./server/src/routes/employee.routes.js";
import doctorRouter from "./server/src/routes/doctor.routes.js";
import appointmentRouter from "./server/src/routes/appointment.routes.js";
import recordRouter from "./server/src/routes/record.routes.js";
import billRouter from "./server/src/routes/bill.routes.js";
import inventoryRouter from "./server/src/routes/inventory.routes.js";
import testReportRouter from "./server/src/routes/testReport.routes.js";
import prescriptionRouter from "./server/src/routes/prescription.routes.js";
import adminRouter from "./server/src/routes/admin.routes.js";
import cookieParser from "cookie-parser";
import verifyJWT from "./server/src/controllers/auth.controllers.js";

const app = express();
dotenv.config({ path: ".env" });
app.use(express.static("public"));
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;
connectDB()
.then(()=>{
        app.listen(port, ()=>{
            console.log("Server running on port: " + port);});
}).catch((error)=>{
    throw new apiError(500, error, "Database connection error", error);
})
app.route("/verify-jwt").get(verifyJWT);
app.use("/patient", patientRouter);
app.use("/employee", employeeRouter);
app.use("/doctor", doctorRouter);
app.use("/appointment", appointmentRouter);
app.use("/record", recordRouter);
app.use("/bill", billRouter);
app.use("/inventory", inventoryRouter);
app.use("/test-report", testReportRouter);
app.use("/prescription", prescriptionRouter);
app.use("/admin", adminRouter);
