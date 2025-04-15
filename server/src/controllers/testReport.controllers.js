import {TestReport} from "../models/testReport.models.js";
import {apiResponse} from "../utils/apiResponse.js";
import mongoose from "mongoose";

const createTestReport = async (req, res) => {
    const {patientId, testDetails, date} = req.body;
    if(!patientId || !testDetails) {
        return res.status(400).send({error: "Provide patient ID and test details"});
    }
    const testReport = await TestReport.create({patientId, testDetails, date});
    if(!testReport) {
        return res.status(400).send({error: "Test Report exists"});
    }
    return res.status(200).json(new apiResponse(200, {testReport}, "testReport generated"));
}
const updateTestReport = async (req, res) => {
    const {testReportId} = req.params;
    const {patientId, testDetails, date} = req.body;
    if(!patientId || !testDetails) {
        return res.status(400).send({error: "Provide patient ID and test details"});
    }
    const testReport = await TestReport.findById(new mongoose.Types.ObjectId(testReportId), {patientId, testDetails, date,}, {new:true});
    if(!testReport) {
        return res.status(400).send({error: "Test Report not found"});
    }
    return res.status(200).json(new apiResponse(200, {testReport}, "testReport updated successfully"));
}
const getTestReport = async (req, res) => {
    const {testReportId} = req.params;
    if(!testReportId) {
        return res.status(400).send({error: "Provide test Report id"});
    }
    const testReport = await TestReport.findById(new mongoose.Types.ObjectId(testReportId))
    if(!testReport) {
        return res.status(400).send({error: "Test Report not found"});
    }
    return res.status(200).json(new apiResponse(200, {testReport}, "testReport fetched"));
}


export {
    createTestReport,
    updateTestReport,
    getTestReport
};