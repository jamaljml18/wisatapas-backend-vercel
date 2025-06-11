const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");

const SECRET_KEY = "rahasia";
const supabase = createClient(
  "https://uewsgcufnuwyobxsuozj.supabase.co",
  "your-supabase-key"
);

export default async function handler(req, res) {
  // Setup CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    // Preflight request
    return res.status(200).end();
  }

  if (req.method !== "POST") return res.status(405).end();

  const { nama, password } = req.body;

  const { data, error } = await supabase
    .from("users")
    .select("id, password")
    .eq("nama", nama)
    .single();

  if (error || !data)
    return res.status(404).json({ message: "User tidak ditemukan" });

  if (password === data.password) {
    const token_id = jwt.sign({ userId: data.id }, SECRET_KEY, {
      expiresIn: "20m",
    });
    const token_nama = jwt.sign({ nama }, SECRET_KEY, { expiresIn: "20m" });

    return res.status(200).json({
      message: "Login berhasil",
      token_id,
      token_nama,
      userId: data.id,
    });
  } else {
    return res.status(401).json({ message: "Password salah" });
  }
}
