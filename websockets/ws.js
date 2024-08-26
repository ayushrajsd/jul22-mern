const express = require("express")
const http = require("http")
const { Server } = require("socket.io")


const app = express()
const server = http.createServer(app)

app.get("/", (re, res) => {
    res.send("Hello World!")
})

app.get("/test", (re, res) => {
    res.send("Hello World!")
})

//Creating a Socket.io server
// Because this will create a socket.io server on top of the HTTP server
const io = new Server(server)

io.on("connection", (socket) => {
    console.log(socket.id)
    console.log("A user has connected")
})

//
app.use(express.static("public"));
// app.use(express.static("test"));

server.listen(3000, () => {
    console.log("Server has started listening!")
})