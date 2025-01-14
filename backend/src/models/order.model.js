import { model, Schema } from "mongoose";
import { OrderStatus } from "../constants/orderStatus.js";
import { FoodModel } from "./food.model.js";

// Latitude-Longitude Schema
export const LatLngSchema = new Schema(
  {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  {
    _id: false,
  }
);

// Order Item Schema
export const OrderItemSchema = new Schema(
  {
    food: { type: FoodModel.schema, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

// Middleware to Calculate Price
OrderItemSchema.pre("validate", function (next) {
  if (this.food && this.food.price && this.quantity) {
    this.price = this.food.price * this.quantity;
  }
  next();
});

// Main Order Schema
const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    addressLatLng: { type: LatLngSchema, required: false }, // Optional if not always provided
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatus.NEW },
    user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Middleware to Calculate Total Price
orderSchema.pre("save", function (next) {
  if (this.items && this.items.length > 0) {
    this.totalPrice = this.items.reduce((sum, item) => sum + item.price, 0);
  }
  next();
});

export const OrderModel = model("order", orderSchema);
