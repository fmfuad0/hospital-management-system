import mongoose from "mongoose";
import Appointment from "../models/appointment.models.js";
import {apiResponse} from "../utils/apiResponse.js";

const createAppointment = async (req, res) => {
    const {patientId, doctorId, slot} = req.body;
    const date = Date.now();
    console.log(date);
    if(!patientId || !doctorId || !date || !slot){
        return res.status(400).send({error: "Provide all information"});
    }
    // const appointment = new Appointment(patientId, doctorId, date, slot);
    // const createdAppointment = await appointment.save();
    const createdAppointment = await Appointment.create({patientId, doctorId, date, slot});
    if(!createdAppointment){
        return res.status(400).send({error: "Appointment already exists"});
    }
    return res.status(200).json(new apiResponse(200, {createdAppointment}, "Appointment created successfully."));
}
const setAppointmentStatus = async (req, res) => {
    const {status, appointmentId} = req.params;
    const appointment =await Appointment.findById(new mongoose.Types.ObjectId(appointmentId));
    if(!appointment){
        return res.status(400).send({error: "Appointment not found"});
    }
    // const updatedAppointment = await AppointmentModels.findByIdAndUpdate(appointmentId._id, {patient: appointment.patient,doctor: appointment.doctor,status: status}, {new:true})
    appointment.status = status;
    await appointment.save({validateBeforeSave:false});
    console.log(appointment);
    if(!appointment.status===status){
        return res.status(400).send({error: "Something went wrong : Appointment not updated"});
    }
    return res.status(200).json(new apiResponse(200, {appointment}, "Appointment updated successfully."));
}
const updateAppointment = async (req, res) => {
    const {appointmentId} = req.params;
    const {patientId, doctorId, slot, date, status} = req.body;
    if(!patientId || !doctorId || !slot){
        return res.status(400).send({error: "Provide all information"});
    }
    const appointment = await Appointment.findByIdAndUpdate(new mongoose.Types.ObjectId(appointmentId), {patient: patientId, doctor: doctorId, slot, date, status}, {new:true})
    if(!appointment){
        return res.status(400).send({error: "Appointment not found"});
    }
    return res.status(200).json(new apiResponse(200, {appointment}, "Appointment updated successfully."));
}

export {
    createAppointment,
    setAppointmentStatus,
    updateAppointment
}