import mongoose, {Schema} from "mongoose";

const inventorySchema = new Schema({
    medicines: {
        type: Number,
        default: 0,
    },
    surgicalTools : {
        type: Number,
        default: 0,
    },
    medicalEquipments : {
        type: Number,
        default: 0,
    },
})

const Inventory  = mongoose.model("Inventory", inventorySchema);
export default Inventory;