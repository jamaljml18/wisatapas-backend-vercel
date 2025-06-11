const jwt = require("jsonwebtoken");
const SECRET_KEY = "rahasia";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    // Handle preflight request
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.status(200).json({
      message: "Token valid",
      nama: decoded.nama,
    });
  } catch (err) {
    console.error("Auth error:", err);
    return res
      .status(401)
      .json({ message: "Token tidak valid atau kedaluwarsa" });
  }
}
