const BACKEND = process.env.VITE_API_URL || 'https://xg-labs-admin.vercel.app';

export default async function handler(req, res) {
  try {
    const response = await fetch(`${BACKEND}/api/articles`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
