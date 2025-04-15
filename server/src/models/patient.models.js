import mongoose, {Schema} from "mongoose";

const patientSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    age:{
        type:Number,
    },
    medicalRecords: [{type : Schema.Types.ObjectId, ref:"Record"}],
}, {timestamps:true})

export const Patient = new mongoose.model('Patient', patientSchema)