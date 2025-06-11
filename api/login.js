const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");

const SECRET_KEY = "rahasia";
const supabase = createClient(
  "https://uewsgcufnuwyobxsuozj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVld3NnY3VmbnV3eW9ieHN1b3pqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTYzMjY3NCwiZXhwIjoyMDY1MjA4Njc0fQ.f5FXBZxXmOgd9vS93mw3dY5V3GWsSzmqPVa4OYrpOww"
);

export default async function handler(req, res) {
  // Izinkan origin (ganti sesuai kebutuhan)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    return res.status(200).end();
  }

  if (req.method !== 'POST') return res.status(405).end();

}

export default async function handler(req, res) {
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
