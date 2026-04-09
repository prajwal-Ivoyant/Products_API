import express from "express"

import {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js"

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
