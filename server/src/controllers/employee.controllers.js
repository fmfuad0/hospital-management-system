import mongoose from "mongoose";
import {Employee} from "../models/employee.models.js";
import {apiError} from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js";

const registerEmployee = async  (req,res)=>{
    const {name, salary, gender, phone, age, address, state, city, pinNo} = req.body;
    if(!name || !gender){
        return res.status(400).json({error: "Please enter name and gender"});
    }
    if(gender!=="male" && gender!=="female" && gender!=="others"){
        return res.status(400).json({error: "Please enter gender in a valid form (male, female, others)."});
    }
    const employee = new Employee({name, salary, gender, phone, address, age, state, city, pinNo});
    const createdEmployee = await employee.save();
    if(!createdEmployee)
        return res.status(500).json(new apiError(500, {error: "Employee could not be registered"}));
    return res.status(201).json(new apiResponse(200, createdEmployee, "Employee created"));
}

export {
    registerEmployee,

}