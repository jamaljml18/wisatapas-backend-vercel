const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://uewsgcufnuwyobxsuozj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...OYrpOww'
);

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { id_user } = req.query;

  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('id_user', id_user);

  if (error) return res.status(500).json({ message: 'Server error' });

  return res.status(200).json(data);
}
