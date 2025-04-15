import express from "express";
import {
    addRemoveStock,
    createInventory,
    getInventory,
    removeInventory
} from "../controllers/inventory.controllers.js";
import verifyJWT from "../controllers/auth.controllers.js";
const inventoryRouter = express.Router();

inventoryRouter.route("/").get(getInventory)
inventoryRouter.route("/create").get(verifyJWT, createInventory)
inventoryRouter.route("/remove").get(verifyJWT, removeInventory)
inventoryRouter.route("/update/:operation").post(verifyJWT, addRemoveStock)

export default inventoryRouter;