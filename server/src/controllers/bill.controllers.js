import mongoose from "mongoose";
import {apiError} from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js";
import {Bill} from "../models/bill.models.js";

const createBill = async (req, res) => {
    // console.log("Running")
    const {patientId, amount, details, billType, } = req.body;
    if(!patientId || !amount || !details || !billType) {
        return res.status(400).json(new apiError(400,{}, "Provide all information", ""));
    }
    const bill = await Bill.create({patientId, amount, details, billType});
    if(!bill) {
        return res.status(400).json(new apiError(400, {}, "Bill not created"));
    }
    return res.status(201).json(new apiResponse(201, {bill}, "Successfully created bill"));
}
const getBill = async (req, res) => {
    const {billId} = req.params;
    console.log({billId});
    if(!billId) {
        return res.status(400).json(new apiError(400, {}, "Provide Bill id", ""));
    }
    const bill = await Bill.findById(new mongoose.Types.ObjectId(billId))
    if(!bill) {
        return res.status(400).json(new apiError(400, {}, "Bill not found", ""));
    }
    return res.status(200).json(new apiResponse(201, {bill}, "Successfull"));
}
const getAllBills = async (req, res) => {
    const bills = await Bill.find()
    // console.log(bills)
    return res.status(200).json(bills)
}
const getBillsOfPatient = async (req, res) => {
    const {patientId} = req.params;
    console.log({patientId});
    if(!patientId) {
        return res.status(400).json(new apiError(400, {}, "Provide patient id", ""));
    }
    const bills = await Bill.find({patientId});
    // console.log(bills);
    if(!bills) {
        return res.status(400).json(new apiError(400, {}, "Bill not found", ""));
    }
    return res.status(200).json(new apiResponse(201, {bills}, "Successfull"));
}
export {
    createBill,
    getBill,
    getAllBills,
    getBillsOfPatient
}