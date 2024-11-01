import router from "./router/index.js";
import mongoose from "./db/db.js";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (dat) => {
    io.emit("receive_message", dat);

    console.log(dat);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(4400, () => {
  console.log("run at 4400");
});
