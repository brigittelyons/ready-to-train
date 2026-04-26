export default async function handler(req, res) {
  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/Sessions?select=date,session_id,exercise_name&order=date.desc&limit=150`,
    {
      headers: {
        apikey: process.env.SUPABASE_SECRET_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
      },
    }
  );
  const data = await response.json();
  res.status(200).json(data);
}
