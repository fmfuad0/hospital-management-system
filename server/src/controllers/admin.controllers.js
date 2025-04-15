import mongoose from "mongoose";
import Admin from "../models/admin.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {apiError} from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js";

const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7 * 1000
};

const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json(new apiError(400, {}, "Provide admin details"))
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const admin =await Admin.create({name, email, password:hash})
    if(!admin){
        return res.status(500).json(new apiError(500, {}, "Admin not created"))
    }
    return res.status(200).json(new apiResponse(200, {admin}, "Admin created successfully"))
}
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json(new apiError(400, {}, "Provide credentials"))
    }
    const admin =await Admin.findOne({email})
    if(!admin){
        return res.status(400).json(new apiError(400, {}, "Admin not found.Check email address"))
    }
    console.log(admin)
    const isPasswordMatch = await admin.isPasswordCorrect(password);
    if(!isPasswordMatch){
        return res.status(400).json(new apiError(400, {}, "Wrong credentials"))
    }
    const accessToken = await admin.generateAccessToken()
    return res.status(200).cookie("accessToken", accessToken).json(new apiResponse(200, {admin}, "Admin login successfull"))
}
const logoutAdmin = async (req, res) => {

}


export {
    registerAdmin,
    loginAdmin,

}