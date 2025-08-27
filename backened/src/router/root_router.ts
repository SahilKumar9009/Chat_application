import express from "express";
import userRouter from "./User_router";

const RootRouter = express.Router();

RootRouter.use("/user", userRouter);

export default RootRouter;
