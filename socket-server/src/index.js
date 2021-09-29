require("dotenv").config();

const express = require("express");
const http = require("http");
const socket = require("./socket");
const { userController } = require("./container");

const app = express();
const server = http.createServer(app);
const PORT = 5000;

app.get("/", function (_req, res) {
  res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

socket(server, userController, {
  cors: {
    origin: [process.env.ORIGIN_URL],
    methods: ["GET", "POST"],
  },
});
