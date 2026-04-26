export default async function handler(req, res) {
  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/Exercises?select=*&order=id.asc`,
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
