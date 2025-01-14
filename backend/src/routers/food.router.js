import { Router } from "express";
import { sample_foods, sample_tags } from "../data.js";
import admin from "../middleware/admin.mid.js";
import handler from "express-async-handler";

const router = Router();

router.get("/", (req, res) => {
  res.send(sample_foods);
});

router.get("/tags", (req, res) => {
  res.send(sample_tags);
});

router.get("/search/:searchTerm", (req, res) => {
  const { searchTerm } = req.params;
  const foods = sample_foods.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});

router.delete(
  "/:foodId",
  admin,
  handler(async (req, res) => {
    const { foodId } = req.params;
    await FoodModel.deleteOne({ _id: foodId });
    res.send();
  })
);

router.get("/tag/:tag", (req, res) => {
  const { tag } = req.params;
  const foods = sample_foods.filter((item) => item.tags?.includes(tag));
  res.send(foods);
});

router.get("/:foodId", (req, res) => {
  const { foodId } = req.params;
  const food = sample_foods.find((item) => item.id === foodId);
  res.send(food);
});

export default router;
