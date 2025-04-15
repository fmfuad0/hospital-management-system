import mongoose, {Schema} from "mongoose";
import { type } from "os";

const doctorSchema = new Schema({
    employeeId:{
        type:Schema.Types.ObjectId,
        ref:"Employee"
    },
    department:{
        type:String,
    },
    qualifications:[{type:String}],
    appointments:[
        {
            type:Schema.Types.ObjectId, ref:"Appointment"
        }
    ],
}, {timestamps:true})

const Doctor = new mongoose.model('Doctor', doctorSchema)
export default Doctor
