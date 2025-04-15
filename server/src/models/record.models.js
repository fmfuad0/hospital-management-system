// models/MedicalRecord.js
import mongoose ,{Schema} from 'mongoose'

const recordSchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    diagnosis: String,
    treatment: String,
    prescription: String,
    date: Date,
});

const Record = mongoose.model('Record', recordSchema);
export default Record
