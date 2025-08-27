import express from "express";
import http from "http";
import { Server } from "socket.io";
import RootRouter from "./router/root_router";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/", RootRouter);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
