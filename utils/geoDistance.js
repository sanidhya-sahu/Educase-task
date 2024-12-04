const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const LAT_KM = 111; // 1 degree of latitude is approximately 111 km
    const LON_KM = 111 * Math.cos(lat1 * Math.PI / 180); // Longitude varies based on latitude
  
    // Calculate differences
    const latDiff = Math.abs(lat2 - lat1) * LAT_KM;
    const lonDiff = Math.abs(lon2 - lon1) * LON_KM;
  
    // Simple Euclidean distance
    return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
};

module.exports = { calculateDistance };