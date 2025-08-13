export default function handler(req, res) {
  const { lat1, lon1, lat2, lon2 } = req.query;

  // Vérification des paramètres
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return res.status(400).json({ error: "Veuillez fournir lat1, lon1, lat2, lon2" });
  }

  // Conversion en nombres
  const R = 6371; // Rayon de la Terre en km
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  // Formule haversine
  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  res.status(200).json({ distance_km: distance.toFixed(2) });
}
