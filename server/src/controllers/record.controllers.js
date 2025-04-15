import mongoose from "mongoose";
import Record from "../models/record.models.js";
import {apiError} from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js";

const createRecord = async (req, res) => {
    console.log("sdkfjh");
    const {patientId, doctorId, diagnosis, treatment, prescription, date} = req.body;
    if(!patientId || !doctorId) {
        return res.status(400).json(new apiError(400, {}, "No patient id or doctor id"));
    }

    const record = await Record.create({
        patient: new mongoose.Types.ObjectId(patientId),
        doctor: new mongoose.Types.ObjectId(doctorId),
        diagnosis,treatment,prescription,date
    }, {new:true})
    if(!record) {
        return res.status(400).json(new apiError(400, {}, "Could not create record"));
    }
    return res.status(200).json(new apiResponse(200, {record}, "Created record successfully"));
}
const getRecord = async (req, res) => {
    const {recordId} = req.params;
    if(!recordId) {
        return res.status(400).json(new apiError(400, {}, "No recordId"));
    }
    const record = await Record.findById(new mongoose.Types.ObjectId(recordId));
    if(!record) {
        return res.status(400).json(new apiError(400, {}, "Could not find record"));
    }
    return res.status(200).json(new apiResponse(200, {record}, "Record successfully fetched"));
}
const updateRecord = async (req, res) => {
    const {recordId} = req.params;
    if(!recordId) {
        return res.status(400).json(new apiError(400, {}, "No recordId"));
    }
    const {patientId, doctorId, diagnosis, treatment, prescription, date} = req.body;
    if(!patientId || !doctorId) {
        return res.status(400).json(new apiError(400, {}, "No or doctor id"));
    }
    const record = await Record.findByIdAndUpdate(new mongoose.Types.ObjectId(recordId), {patient: new mongoose.Types.ObjectId(patientId), doctor: new mongoose.Types.ObjectId(doctorId), diagnosis, treatment, prescription, date})
    if(!record) {
        return res.status(400).json(new apiError(400, {}, "Could not find record"));
    }
    return res.status(200).json(new apiResponse(200, {record}, "Updated record successfully"));
}

export {
    createRecord,
    getRecord,
    updateRecord,
}