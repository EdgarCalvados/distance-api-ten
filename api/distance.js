export default function handler(req, res) {
  const { lat1, lon1, lat2, lon2 } = req.query;

  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Rayon de la Terre en km
  const φ1 = toRad(parseFloat(lat1));
  const φ2 = toRad(parseFloat(lat2));
  const Δφ = toRad(parseFloat(lat2) - parseFloat(lat1));
  const Δλ = toRad(parseFloat(lon2) - parseFloat(lon1));

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  res.status(200).json({ distance: parseFloat(distance.toFixed(2)) });
}
