const express = require("express");
const app = express();

function calculateFibonacci(number) {
  if (number <= 1) return number;
  return calculateFibonacci(number - 1) + calculateFibonacci(number - 2);
}
app.use(express.static("public"));

app.get("/fib", (req, res) => {
  const { number, requestNumber } = req.query;
  console.log("handler fn ran for req", requestNumber);
  if (!number || isNaN(number)) return res.status(400).send("Invalid number");
  const answer = calculateFibonacci(parseInt(number));
  res.status(200).json({
    status: "success",
    message: `Fibonacci of ${number} is ${answer}`,
    requestNumber,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
