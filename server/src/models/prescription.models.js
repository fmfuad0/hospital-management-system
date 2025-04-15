import mongoose, {Schema} from "mongoose";

const prescriptionSchema = new Schema({
    patientId:{
        type:Schema.Types.ObjectId,
        ref:"Patient",
    },
    medications:[{}],
    doses:[{}],
    date:{
        type:Date,
        default:Date.now
    }
}, {timestamps:true})

const Prescription = new mongoose.model('Prescription', prescriptionSchema)

export default Prescription