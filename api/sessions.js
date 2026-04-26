export default async function handler(req, res) {
  const { exercise_id } = req.query;
  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/Sessions?select=*&exercise_id=eq.${exercise_id}&order=date.desc&limit=200`,
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
