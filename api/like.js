const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://uewsgcufnuwyobxsuozj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVld3NnY3VmbnV3eW9ieHN1b3pqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTYzMjY3NCwiZXhwIjoyMDY1MjA4Njc0fQ.f5FXBZxXmOgd9vS93mw3dY5V3GWsSzmqPVa4OYrpOww"
);

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

  const payload = req.body;

  const { data: existing, error: findError } = await supabase
    .from("likes")
    .select("*")
    .eq("id_user", payload.id_user)
    .eq("id_tempat", payload.id_tempat)
    .maybeSingle();

  if (findError) return res.status(500).json({ message: "Server error" });

  if (existing)
    return res
      .status(409)
      .json({ message: "Tempat ini sudah ada di favorit Anda." });

  const { error } = await supabase.from("likes").insert([payload]);

  if (error) return res.status(500).json({ message: "Server error" });

  return res
    .status(201)
    .json({ message: "Tempat berhasil ditambahkan ke favorit." });
}
