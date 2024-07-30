const express = require("express");
const connectDB = require("./config/db");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use("/api/products", productRouter); // /api/products/ - get
app.use("/api/users", userRouter);

app.listen(3001, function () {
  console.log("server started");
});
