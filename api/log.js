export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/Sessions`,
    {
      method: 'POST',
      headers: {
        apikey: process.env.SUPABASE_SECRET_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(req.body),
    }
  );
  if (!response.ok) return res.status(response.status).json({ error: 'Failed to log sets' });
  res.status(200).json({ success: true });
}
