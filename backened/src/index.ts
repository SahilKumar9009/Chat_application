import express from "express";
import http from "http";
import { Server } from "socket.io";
import RootRouter from "./router/root_router";
import { configDotenv } from "dotenv";
import { connectDb } from "./db/ConnectDb";
import { createUser, loginUser } from "./controller/user-controller";

const app = express();
const server = http.createServer(app);

configDotenv({
  path: "./src/config/.env",
});

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/", RootRouter);

app.post("/api/user", createUser);
app.post("/api/login", loginUser);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.listen(3000, () => {
  connectDb();
  console.log("Server is running on port 3000");
});
