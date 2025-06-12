const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://uewsgcufnuwyobxsuozj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVld3NnY3VmbnV3eW9ieHN1b3pqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTYzMjY3NCwiZXhwIjoyMDY1MjA4Njc0fQ.f5FXBZxXmOgd9vS93mw3dY5V3GWsSzmqPVa4OYrpOww"
);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); 
  }

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id_user, nama_user, id_tempat, nama_tempat } = req.body;

    const { error } = await supabase
      .from("likes")
      .delete()
      .match({ id_user, nama_user, id_tempat, nama_tempat });

    if (error) throw error;

    return res.status(200).json({ message: "Tempat favorit berhasil dihapus" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
