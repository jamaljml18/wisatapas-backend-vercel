const jwt = require("jsonwebtoken");
const SECRET_KEY = "rahasia";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.status(200).json({
      message: "Token valid",
      userId: decoded.userId,
    });
  } catch (err) {
    console.error("Auth error:", err);
    return res
      .status(401)
      .json({ message: "Token tidak valid atau kedaluwarsa" });
  }
}
