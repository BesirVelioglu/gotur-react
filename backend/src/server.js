import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import { dirname, join } from "path"; // `path` modülünden dirname ve join fonksiyonları alındı.
import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import userRouter from "./routers/user.router.js";
import orderRouter from "./routers/order.router.js";

import { dbconnect } from "./config/database.config.js";

// Veritabanı bağlantısı
dbconnect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

// `__filename` ve `__dirname` tanımlamaları
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

// CORS yapılandırması
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"], // Frontend URL
  })
);

// Router'lar
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// Public klasörü
const publicFolder = join(__dirname, "public"); // `path.join` ile birleştirildi
app.use(express.static(publicFolder));

// Tüm diğer istekler için React'ın `index.html` dosyasını gönder
app.get("*", (req, res) => {
  const indexFilePath = join(publicFolder, "index.html");
  res.sendFile(indexFilePath);
});

// Sunucu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
