const fetch = require("node-fetch");

export default async function handler(req, res) {
  // Izinkan origin (ganti sesuai kebutuhan)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    // Handle preflight request
    return res.status(200).end();
  }

  if (req.method !== "POST") return res.status(405).end();

  const { user_id, favorite_place } = req.body;

  try {
    const response = await fetch("https://mjamalm18-fastapi-wisatapas.hf.space/textgen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, favorite_place }),
    });

    if (!response.ok) throw new Error("Gagal melakukan text generation");

    const data = await response.json();

    return res.status(200).json({
      status: "success",
      user_id: data.user_id,
      favorite_place: data.favorite_place,
      gen_text: data.gen_text,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "fail",
      message: "Gagal menghasilkan teks rekomendasi",
    });
  }
}
