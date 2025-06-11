const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://uewsgcufnuwyobxsuozj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVld3NnY3VmbnV3eW9ieHN1b3pqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTYzMjY3NCwiZXhwIjoyMDY1MjA4Njc0fQ.f5FXBZxXmOgd9vS93mw3dY5V3GWsSzmqPVa4OYrpOww"
);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Hanya izinkan GET request di sini
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id_user } = req.query;

  try {
    const { data, error } = await supabase
      .from("likes")
      .select("*")
      .eq("id_user", id_user);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ message: "Server error" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ message: "Unexpected server error" });
  }
}
