const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://uewsgcufnuwyobxsuozj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...OYrpOww"
);

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();

  const { id_user, nama_user, id_tempat, nama_tempat } = req.body;

  const { error } = await supabase
    .from("likes")
    .delete()
    .match({ id_user, nama_user, id_tempat, nama_tempat });

  if (error) return res.status(500).json({ message: "Server error" });

  return res.status(200).json({ message: "Tempat favorit berhasil dihapus" });
}
