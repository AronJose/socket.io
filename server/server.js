const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io')
const PORT = 3001;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3002",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`connected ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id :${socket.id} join room: ${data}`)
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        console.log(data,"data");
    });

    socket.on("disconnect", () => {
        console.log('User Disconnected', socket.id)
    })
});

server.listen(PORT, () => {
    console.log(`Server connected`);
})
