const express = require("express");

const app = express();
require("dotenv").config(); // loads the environment variables from a .env file into process.env
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const moviesRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoutes");
const showRouter = require("./routes/showRoutes");

connectDB();

app.use(express.json());
/** Routes */
app.use("/api/users", userRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);

app.listen(8082, () => {
  console.log("Server is running at port 8082");
});
