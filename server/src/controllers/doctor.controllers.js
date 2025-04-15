import mongoose from "mongoose";
import Doctor from "../models/doctor.models.js";
import {apiResponse} from "../utils/apiResponse.js";

const registerDoctor = async (req, res) =>{
    const {employeeId} = req.params
    const { department, qualifications} = req.body;
    if(!employeeId){
        return res.status(400).send("Employee id is required");
    }
    const doctor = new Doctor({employeeId, department, qualifications});
    const registeredDoctor = await doctor.save()
    if(!registeredDoctor){
        return res.status(400).send("Doctor already exists");
    }
    return res.status(201).json(new apiResponse(201, {registeredDoctor}, "Doctor registered"));
}

export {
    registerDoctor,
};