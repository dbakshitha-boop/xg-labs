const BACKEND = process.env.VITE_API_URL || 'https://xg-labs-admin.vercel.app';

module.exports = async function handler(req, res) {
  const { id } = req.query;
  try {
    const response = await fetch(`${BACKEND}/api/articles/${id}`);
    const text = await response.text();
    if (!response.ok) return res.status(response.status).json({ error: `Backend error ${response.status}` });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
