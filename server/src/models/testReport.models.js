import mongoose, {Schema} from "mongoose";

const testReportSchema = new Schema({
    patientId:{
        type: Schema.Types.ObjectId,
        ref: "Patient"
    },
    testDetails:{
        type :[{}],
    },
    date : {
        type :Date,
        default : Date.now()
    },
}, {timestamps:true})

export const TestReport = new mongoose.model('TestReport', testReportSchema)