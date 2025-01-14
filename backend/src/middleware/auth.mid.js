import pkg from "jsonwebtoken";
const { verify } = pkg; // verify fonksiyonunu destructure ediyoruz.

import { UNAUTHORIZED } from "../constants/httpStatus.js";

export default (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Authorization header'dan token'ı al
  if (!token) {
    console.error("Access token is missing");
    return res.status(UNAUTHORIZED).send("Access token is missing.");
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET); // Token doğrulama
    req.user = decoded; // Doğrulanmış kullanıcı bilgisi req.user'a atanır
    next(); // Middleware'den sonraki işleme geç
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(UNAUTHORIZED).send("Invalid or expired token.");
  }
};
