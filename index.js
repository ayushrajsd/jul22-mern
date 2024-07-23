// // const fs = require("fs"); // file system module ; Common Js module
// // // import fs from "fs"; // ES6 module

// // // fs.readFile("file.txt", "utf8", (err, data) => {
// // //   // error first callback
// // //   if (err) {
// // //     console.log(err);
// // //     return;
// // //   } else {
// // //     console.log("data from file", data);
// // //   }
// // // });

// // // const content = "This is a new file created by Node.js";
// // // fs.writeFile("example.txt", content, "utf8", (err) => {
// // //   if (err) {
// // //     console.log(err);
// // //     return;
// // //   }
// // //   console.log("File created successfully");
// // // });

// // // const data = fs.readFileSync("example.txt", "utf8");
// // // console.log("Data from file", data);

// // // fs.rename("example.txt", "new-example.txt", (err) => {
// // //   if (err) {
// // //     console.log(err);
// // //     return;
// // //   }
// // //   console.log("File renamed successfully");
// // // });

// // // fs.unlink("new-example.txt", (err) => {
// // //   if (err) {
// // //     console.log(err);
// // //     return;
// // //   }
// // //   console.log("File deleted successfully");
// // // });

// // // fs.stat("file1.txt", (err, stats) => {
// // //   if (err) {
// // //     console.log("error found", err.message);
// // //     return;
// // //   }
// // //   console.log(stats.size);
// // //   console.log(stats.isDirectory());
// // // });

// // // const directoryName = "my-directory";
// // // fs.mkdir(directoryName, (err) => {
// // //   if (err) {
// // //     console.log(err);
// // //     return;
// // //   }
// // //   console.log("Directory created successfully");
// // // });

// // // const directoryPath = "./my-directory";
// // // if (fs.existsSync(directoryPath)) {
// // //   console.log("Directory exists");
// // // } else {
// // //   console.log("Directory does not exist");
// // // }

// // // fs.access
// // /**
// //  * path module
// //  * it is essential when dealing with file paths in different operating systems
// //  * file path format differs in different operating systems
// //  * windows: C:\Users\user\Documents\file.txt
// //  * POSIX: /home/user/Documents/file.txt
// //  */

// // const path = require("path");

// // const fullPath = path.join("folder", "subFolder", "file.txt");
// // console.log(fullPath);

// // const absolutePath = path.resolve("folder", "subFolder", "file.txt");
// // console.log(absolutePath);

// // const fileName = path.basename("./dir/file.txt");
// // console.log(fileName);

// // const extName = path.extname("./dir/file.txt");
// // console.log(extName);

// // const normalizedpath = path.normalize("/path/to/../file.txt"); // /path/file.txt  normalizes / resoilves all . and .. in the path
// // console.log(normalizedpath);

// // const complexPath = "/path/./to/../to/../../file.txt";
// // const normalizedPath = path.normalize(complexPath);
// // console.log(normalizedPath);

// const fs = require("fs");
// const sourceFilePath = "./dir/file.txt";
// const destinationPath = "./destination-file.txt";

// // create a readable stream from the source file
// const readStream = fs.createReadStream(sourceFilePath);

// // create a writable stream to the destination file
// const writeStream = fs.createWriteStream(destinationPath);

// // pipe the data from the read stream to the write stream
// readStream.pipe(writeStream);

// // handle any errors
// readStream.on("error", (err) => {
//   console.log("Error reading file", err.message);
// });

// writeStream.on("error", (err) => {
//   console.log("Error writing file", err.message);
// });

// writeStream.on("finish", () => {
//   console.log("File copied successfully");
// });

const http = require("http");

const server = http.createServer((req, res) => {
  // handle incoming requests and send response
  //   res.setHeader("Content-Type", "text/html"); // mime -types ": maintype / subtype"
  //   //   res.write("Hello World");
  //   res.write("<html><head><title>Node.js Server</title></head><body>");
  //   res.write("<h1>Hello World </h1></body></html>");
  res.setHeader("Content-Type", "application/json");
  const jsonData = {
    message: "Hello World",
    date: new Date(),
  };
  const jsonResponse = JSON.stringify(jsonData);
  res.write(jsonResponse);
  res.end();
});

const port = 8002;
const host = "localhost";
server.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
