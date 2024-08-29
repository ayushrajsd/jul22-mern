// console.log(process.moduleLoadList);
const fs = require("fs");

const content = Math.random().toString(36).repeat(10000000);

fs.writeFileSync("big.file", content);
