import Product from "../models/products.model.js"
import asyncHandler from "../utils/asyncHandler.js"

// ================== create product =====================================
export const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);

     const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Name and price are required"
    });
  }

    res.status(201).json(product);
})
// ================== get all product =====================================
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products)
})

// ================== get One product =====================================
export const getOneProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
    res.json(product);
})

// ================== update product =====================================
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  res.json(product);
});

// ================== delete product =====================================
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ message: "Deleted Successfully" });
});