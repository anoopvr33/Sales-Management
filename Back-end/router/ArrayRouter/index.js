import Arrays from "../../db/Schemas/array.js";
import express from "express";

const router = express.Router();

router.post("/array/details", async (req, res) => {
  const body = { ...req.body };
  const item = await Arrays.create(body);
  res.json(item);
});

router.get("/array", async (req, res) => {
  const user = await Arrays.find();
  res.json(user);
});

router.delete("/delete", async (req, res) => {
  const user = await Arrays.deleteMany();
  res.json(user);
});
export default router;
