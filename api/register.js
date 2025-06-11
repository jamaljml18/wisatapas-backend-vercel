const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://uewsgcufnuwyobxsuozj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...OYrpOww"
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { nama, password1, password2 } = req.body;

  if (password1 !== password2)
    return res.status(400).json({ message: "Password tidak cocok" });

  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("nama", nama)
    .single();

  if (existingUser)
    return res.status(409).json({ message: "Nama pengguna sudah terdaftar" });

  const { data: lastUser } = await supabase
    .from("users")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .single();

  const newId = lastUser ? String(parseInt(lastUser.id) + 1) : "1";

  const { error } = await supabase
    .from("users")
    .insert([{ id: newId, nama, password: password1 }]);

  if (error) return res.status(500).json({ message: "Server error" });

  return res.status(201).json({ message: "Registrasi berhasil" });
}
