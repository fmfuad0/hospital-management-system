import mongoose from "mongoose";
import {Patient} from "../models/patient.models.js";
import {apiResponse} from "../utils/apiResponse.js";
import {apiError} from "../utils/apiError.js";

const registerPatient = async (req, res) => {
    const {name, gender, phone, age} = req.body;

    if(!name || !gender || !phone || !age) {
        return res.status(400).send({error: "Please enter all informations "});
    }

    const patient = new Patient({name, gender, phone, age});
    const createdPatient = await patient.save();
    if(!createdPatient) {
        return res.status(400).json(new apiError(500, {error: "Could not register patient", }));
    }
    return res.status(200).json(new apiResponse(200, {patient}, "Patient created successfully."))
}
const getPatientInfo = async (req, res) => {
    const {patientId} = req.params;
    if(!patientId) {
        return res.status(400).json(new apiError(500, {error: "Please enter patientId", }));
    }
    const patient = await Patient.findById(new mongoose.Types.ObjectId(patientId));
    if(!patient) {
        return res.status(404).json(new apiError(404, {error: "Patient not found", }));
    }
    return res.status(200).json(new apiResponse(200, patient, "Patient info fetched"));
}
const updatePatient = async (req, res) => {
    const {patientId} = req.params;
    const {name, gender, phone, age} = req.body;
    console.log(name, gender, phone, age);
    if(!patientId || !name || !gender || !phone || !age) {
        return res.status(400).json(new apiError(500, {error: "Please enter patientId, name, gender, phone, age", }));
    }
    const updatedPatient = await Patient.findByIdAndUpdate(new mongoose.Types.ObjectId(patientId), {name, gender, phone, age}, {new:true});
    if(!updatedPatient) {
        return res.status(404).json(new apiError(404, {error: "Patient not found", }));
    }
    return res.status(200).json(new apiResponse(200, {updatedPatient}, "Patient info updated"));
}
const getMedicalRecords  = async (req, res) => {
    const {patientId} = req.params;
    if(!patientId) {
        res.send({error: "Please provide patient id"});
    }
    const patient = await Patient.findById(new mongoose.Types.ObjectId(patientId))
    if(!patient) {
        return res.status(404).json(new apiError(404, {error: "Patient not found", }));
    }
    return res.status(200).json(new apiResponse(200, patient.medicalRecords, "Medical records fetched"));
}

export {
    registerPatient,
    getPatientInfo,
    updatePatient,
    getMedicalRecords,
}