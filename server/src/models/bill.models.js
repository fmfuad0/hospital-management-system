import mongoose, {Schema} from "mongoose";

const billSchema = new Schema({
    patientId:{
        type: Schema.Types.ObjectId,
        ref: "Patient"
    },
    amount:{
        type: Number,
        required:true
    },
    details:{
        type:{},
    },
    billType:{
        type: String,
        enum:['Cash', 'Card', 'Mobile Payment']
    },
}, {timestamps:true})

export const Bill = new mongoose.model('Bill', billSchema)