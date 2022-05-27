import express  from "express";
import AirbnbController from "./airbnb.controller.js";
const router = express.Router();

router.route("/").get(AirbnbController.apiGetAllLists);
router.route("/id/:id").get(AirbnbController.apiGetListById)
router.route("/type/:type").get(AirbnbController.apiGetListByType)
router.route("/price/:price").get(AirbnbController.apiGetListByPrice);
router.route("/price&type").get(AirbnbController.getListByPrice_Type); 
export default router; 
