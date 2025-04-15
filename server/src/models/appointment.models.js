import mongoose, {Schema} from 'mongoose';

const appointmentSchema = new Schema({
    patient:{
        type: mongoose.Types.ObjectId,
        ref: 'Patient',
    },
    doctor:{
        type: mongoose.Types.ObjectId,
        ref: 'Doctor',
    },
    date:{
        type: Date,
    },
    slot:{
        type: String,
        enum: ["Morning", "Evening"]
    },
    status : {
        type: String,
        enum: ["PENDING", "COMPLETED", "CANCELED"],
        default: 'PENDING'
    },
}, {timestamps:true})


const Appointment = new mongoose.model('Appointment', appointmentSchema)
export default Appointment

