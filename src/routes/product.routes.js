import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addProductsList, addProductsToDB, getAllProducts } from "../controllers/product.controller.js";

const router = Router();

router.route("/add-product").post(verifyJWT, addProductsToDB)
router.route("/add-products-list").post(verifyJWT, addProductsList)
router.route("/get-Products").get(verifyJWT, getAllProducts)

export default router