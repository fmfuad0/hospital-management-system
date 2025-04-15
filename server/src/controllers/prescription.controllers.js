import Prescription from "../models/prescription.models.js";
import {apiResponse} from "../utils/apiResponse.js";
import {apiError} from "../utils/apiError.js";
import mongoose from "mongoose";

const createPrescription = async (req, res) => {
    const {patientId, medications, doses, date} = req.body;
    console.log({patientId, medications, doses, date} )
    if(!patientId || !medications || !doses){
        return res.status(400).send({error: 'Please, provide all information'});
    }
    const prescription = await Prescription.create({patientId, medications, doses, date});
    if(!prescription){
        return res.status(400).send({error: 'Could not create prescription'});
    }
    return res.status(201).json(new apiResponse(200, {prescription}, "Prescription created successfully."));
}
const updatePrescription = async (req, res) => {
    const {prescriptionId} = req.params;
    const {patientId, medications, doses, date} = req.body;
    if(!patientId || !medications || !doses) {
        return res.status(400).json(new apiError(500, {error: "Please provide all informations", }));
    }
    const updatedPrescription = await Prescription.findByIdAndUpdate(new mongoose.Types.ObjectId(prescriptionId), {patientId, medications, doses, date}, {new:true});
    console.log(updatedPrescription);
    if(!updatedPrescription) {
        return res.status(404).json(new apiError(404, {error: "Prescription not found", }));
    }
    return res.status(200).json(new apiResponse(200, {updatedPrescription}, "Prescription updated"));
}
const getPrescription = async (req, res) => {
    const {prescriptionId} = req.params;
    if(!prescriptionId) {
        return res.status(400).json(new apiError(500, {error: "Please provide prescription id", }));
    }
    const prescription = await Prescription.findById(new mongoose.Types.ObjectId(prescriptionId));
    if(!prescription) {
        return res.status(404).json(new apiError(404, {error: "Prescription not found", }));
    }
    return res.status(200).json(new apiResponse(200, {prescription}, "Prescription fetched"));
}

export {
    createPrescription,
    updatePrescription,
    getPrescription
};