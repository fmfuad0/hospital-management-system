import mongoose, {Schema} from "mongoose";

const nurseSchema = new Schema({
    employeeId:{
        type: Schema.Types.ObjectId,
        ref: "Employee"
    }
}, {timestamps:true})

export const Nurse = new mongoose.model('Nurse', nurseSchema)