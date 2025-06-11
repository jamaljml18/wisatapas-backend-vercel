const fetch = require("node-fetch");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { user_id, favorite_place } = req.body;

  try {
    const response = await fetch("http://127.0.0.1:8000/textgen", {
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
