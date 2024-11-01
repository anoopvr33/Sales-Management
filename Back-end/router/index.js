import express from "express";
import ArrayRouter from "./ArrayRouter/index.js";

const router = express.Router();

router.use("/array", ArrayRouter);

export default router;
