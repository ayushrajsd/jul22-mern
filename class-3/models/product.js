const mongoose = require("mongoose");

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
      type: [String],
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

productSchema.pre("save", function () {
  console.log("Pre Hook");
  this.confirmPassword = undefined;
});

const validCategories = ["electronics", "fashion", "appliances", "games"];

productSchema.pre("save", function (next) {
  const invalidCategories = this.category.filter((category) => {
    return !validCategories.includes(category);
  });
  if (invalidCategories.length > 0) {
    // error
    return next(new Error(`Invalid categories ${invalidCategories.join(",")}`));
  } else {
    //success
    next();
  }
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
