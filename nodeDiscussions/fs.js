const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "big.file");
const readableStream = fs.createReadStream(filePath);
const writableStream = fs.createWriteStream("anotherCopyOfBig.file");
// readableStream.on("data", (chunk) => {
//   console.log(`Received ${chunk.length} bytes of data.`);
//   writeableStream.write(chunk);
// });
// readableStream.on("end", () => {
//   console.log("Finished reading file.");
//   writeableStream.end();
// });
// readableStream.pipe(writableStream);

// readableStream.on("error", (err) => {
//   console.error("Error reading file:", err);
// });

// writableStream.on("error", (err) => {
//   console.error("Error writing file:", err);
// });

const server = http.createServer();

server.on("request", (req, res) => {
  //   fs.readFile("./big.file", (err, data) => {
  //     if (err) throw err;
  //     res.end(data);
  //   });
  const src = fs.createReadStream("./big.file");
  src.pipe(res);
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
