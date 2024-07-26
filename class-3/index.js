// // mongodb+srv://ayushrajsd:n30kzniwzQFzVjnS@cluster0.bmvb8h3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoose = require("mongoose");
const express = require("express");

const dbUrl = `mongodb+srv://ayushrajsd:n30kzniwzQFzVjnS@cluster0.bmvb8h3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();

mongoose
  .connect(dbUrl)
  .then(function (connection) {
    console.log("connected to db");
  })
  .catch(function (err) {
    console.log(err);
  });

// Schema

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      unique: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    isInStock: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    confirmPassword: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: function () {
          return this.password === this.confirmPassword;
        },
        message: "Password and confirm password should be same",
      },
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("products", productSchema);

app.use(express.json());

// create a product
app.post("/api/products", async (req, res) => {
  const body = req.body;
  try {
    const product = await ProductModel.create({
      product_name: body.product_name,
      product_price: body.product_price,
      category: body.category,
      isInStock: body.isInStock,
      password: body.password,
      confirmPassword: body.confirmPassword,
    });
    console.log(product);
    return res.status(201).json({ message: "Product created", product });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// get all products
app.get("/api/products", async (req, res) => {
  const products = await ProductModel.find({ category: "electronics" });
  return res.status(200).json({ products });
});

// find a product by id
app.get("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  return res.status(200).json({ product });
});

// update a product
app.put("/api/products/:id", async (req, res) => {
  await ProductModel.findByIdAndUpdate(req.params.id, req.body);
  return res.status(201).json({ message: "Product updated" });
});

// delete a product
app.delete("/api/products/:id", async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "Product deleted" });
});

app.listen(3000, function () {
  console.log("server started");
});
