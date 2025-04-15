import mongoose, {Schema} from "mongoose";

const employeeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    salary:{
        type: Number,
    },
    gender:{
        type:String,
        required:true,
        enum:['male', 'female', 'others']
    },
    phone:{
        type:String,
    },
    age:{
        type:Number,
    },
    address:{
        type:String,
    },
    state:{
        type:String,
    },
    city:{
        type:String,
    },
    
    pinNo:{
        type:Number,
    },
    
}, {timestamps:true})

export const Employee = new mongoose.model('Employee', employeeSchema)