const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");

const productRouter = express.Router();

productRouter.get("/", getAllProducts); // /api/products/

productRouter.post("/", createProduct);

// find a product by id
productRouter.get("/:id", getProductById); // /api/products/123

// update a product
productRouter.put("/:id", updateProductById);

// delete a product
productRouter.delete("/:id", deleteProductById);

module.exports = productRouter;
