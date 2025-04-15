import Inventory from "../models/inventory.models.js";
import {apiError} from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js";

const createInventory = async (req, res) => {
    const size = await Inventory.countDocuments()
    if (size>0) {
        return res.status(400).json(new apiError(400, {}, "Inventory already exists.Please remove the current inventory to create a new one"));
    }
    const inventory = await Inventory.create({});
    return res.status(201).json(new apiResponse(201, inventory, "Inventory created"));
}
const removeInventory = async (req, res) => {
    const inventory = await Inventory.find()
    if (!inventory[0])
        return res.status(404).json(new apiError(404,{}, "Inventory not found"));
    try {
        await Inventory.findByIdAndDelete(inventory[0]._id)
        return res.status(200).json(new apiResponse(201,{}, "Inventory deleted."));
    }catch (error) {
        console.log(error);
    }

}
const getInventory = async (req, res) => {
    const inventory = await Inventory.find()
    if (!inventory[0])
        return res.status(404).json(new apiError(404, "No Inventory found"))
    return res.status(200).json(new apiResponse(200,inventory[0], "Inventory found"));
}
const addRemoveStock = async (req, res) => {
    const {stock} = req.body;
    const {operation} = req.params;
    if(operation === "remove") {
        stock.medicines *=-1;
        stock.surgicalTools *=-1;
        stock.medicalEquipments *=-1;
    }
    console.log(stock)
    const result = await fetch("http://localhost:3000/inventory", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }

    })
    if(result.ok){
        const data = (await result.json()).data;
        const inventory = await Inventory.findByIdAndUpdate(data._id, {
            $inc : {
                'medicines' : stock.medicines,
                'surgicalTools' : stock.surgicalTools,
                'medicalEquipments' : stock.medicalEquipments
            },
        }, {new :true})
        console.log(inventory)
        return res.status(200).json(new apiResponse(201,inventory, "Add-stock successfull.Inventory Updated."));
    }
    return res.status(404).json(new apiError(404, {}, "Inventory not found"));
}


export {
    createInventory,
    removeInventory,
    getInventory,
    addRemoveStock,

}