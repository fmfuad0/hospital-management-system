import jwt from 'jsonwebtoken';
import Admin from "../models/admin.models.js";
import mongoose from "mongoose";
import {apiError} from "../utils/apiError.js";

const verifyJWT = async function(req, res, next) {
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") ;
    if(!accessToken){
        return res.status(401).json(new apiError(401, {}, "Login first"))
    }
    console.log(accessToken);
    const decodedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    // console.log(decodedToken)
    const admin = await Admin.findById(new mongoose.Types.ObjectId(decodedToken.id)).select("-password");
    if(!admin){
        return res.status(401).json(new apiError(401, {}, "Invalid Access Token"))
    }
    console.log("JWT verified")
    console.log(admin)
    next()
    // return res.status(200).json(new apiResponse(200, {admin}, "JWT verified"))
}

export default verifyJWT