import { Router } from "express";
import handler from "express-async-handler";
import auth from "../middleware/auth.mid.js";
import { BAD_REQUEST } from "../constants/httpStatus.js";
import { OrderModel } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";

const router = Router();
router.use(auth);

router.post(
  "/create",
  handler(async (req, res) => {
    console.log("Creating order for user:", req.user.id); // Kullanıcı logu

    const order = req.body;

    if (!order.items || order.items.length <= 0) {
      console.error("Cart is empty");
      return res
        .status(BAD_REQUEST)
        .send("Cart is empty. Please add items to the cart.");
    }

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save(); // Yeni siparişi veritabanına kaydet
    console.log("Order created successfully:", newOrder); // Sipariş logu
    res.send(newOrder);
  })
);

export default router;
