import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addProductsList, addProductsToDB, deleteAllProducts, getAllProducts, getMenData, getWomenData } from "../controllers/product.controller.js";

const router = Router();

router.route("/add-product").post(verifyJWT, addProductsToDB)
router.route("/add-products-list").post(verifyJWT, addProductsList)
router.route("/delete-products-list").post(verifyJWT, deleteAllProducts)
router.route("/get-Products").get(getAllProducts)
router.route("/men").get(getMenData)
router.route("/women").get(getWomenData)

export default router