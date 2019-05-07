const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();

app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

const API_KEY = process.env.DARK_SKY_SECRET_KEY

io.on("connection", socket => {
    console.log("New client connected"), setInterval(
        () => getData(socket),
        10000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
});

const getData = async socket => {
    try {
        const res = await axios.get(
            "https://api.darksky.net/forecast/"+API_KEY+"/-7.2306,-35.8811"
        );
        socket.emit("FromAPI", res.data.currently);
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

server.listen(port, () => console.log(`Listening on port ${port}`));
