const ProductModel = require("../models/product");

const createProduct = async (req, res) => {
  const body = req.body;
  console.log("Body", body);
  try {
    const product = await ProductModel.create({
      product_name: body.product_name,
      product_price: body.product_price,
      category: body.category,
      isInStock: body.isInStock,
      password: body.password,
      confirmPassword: body.confirmPassword,
    });
    console.log("Product created", product);
    return res.status(201).json({ message: "Product created", product });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  const products = await ProductModel.find({ category: "electronics" });
  return res.status(200).json({ products });
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  return res.status(200).json({ product });
};

const updateProductById = async (req, res) => {
  await ProductModel.findByIdAndUpdate(req.params.id, req.body);
  return res.status(201).json({ message: "Product updated" });
};

const deleteProductById = async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "Product deleted" });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
