const express = require("express");

// create an express application
const app = express();
app.use(express.static("public"));

app.use(express.json()); // for parsing application/json - json data is made available in req.body
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded - form data is made available in req.body
// example of url endoded form data
// name=John+Doe&age=30&email=johndoe%40gmail.com

app.use((req, res) => {
  res.status(404).send("Page not found");
});
// const loggerMiddleware = (req, res, next) => {
//   console.log(
//     `Logged  ${req.url}  ${req.method} -- ${new Date().toISOString()}`
//   );
//   next();
// };
// app.use(loggerMiddleware);
// define a route - GET request
app.get("/", (req, res) => {
  res.send("Hello, Express , responding to get request");
});

app.get("/about", (req, res) => {
  res.send("this is the about page");
});

app.post("/data", (req, res) => {
  console.log(req.body);
  res.send("Received a post request");
});

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Doe" },
];

// post endpoint to add a new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  const userId = users.length + 1;
  newUser.id = userId;

  users.push(newUser);
  res.status(201).json({ message: "User Created", user: newUser });
});

app.delete("/users/:id", (req, res) => {
  //   console.log("Request", req);
  const userId = req.params.id;
  console.log("User ID", userId);

  // find the user by id
  const userIndex = users.findIndex((user) => user.id == userId);

  if (userIndex == -1) {
    return res.status(404).json({ message: "User not found" });
  }

  // remove the user
  users.splice(userIndex, 1);
  res.json({ message: "User deleted" });
});

app.get("/users", (req, res) => {
  res.json(users);
});

// /special route - get method

app.get("/special", loggerMiddleware, authMiddleware, (req, res) => {
  res.send("Special page");
});

app.get("/search", (req, res) => {
  console.log("Query params", req.query);
  res.send("Search page");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});
