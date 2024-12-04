const School = require('../models/School');
const { validateSchool } = require('../utils/validation');
const { calculateDistance } = require('../utils/geoDistance');

exports.addSchool = async (req, res) => {
  try {
    // Validate input
    console.log(req);
    
    const { error } = validateSchool(req.body);
    if (error) {
      return res.status(400).json({ 
        error: 'Validation Failed', 
        details: error.details[0].message 
      });
    }

    // Create new school
    const newSchool = new School(req.body);
    await newSchool.save();

    res.status(201).json({
      message: 'School added successfully',
      school: newSchool
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error', 
      message: error.message 
    });
  }
};

exports.listSchools = async (req, res) => {
    try {
        const { latitude, longitude, radius = 10 } = req.query;
    
        // Validate location parameters
        if (!latitude || !longitude) {
          return res.status(400).json({ 
            error: 'Latitude and Longitude are required' 
          });
        }
    
        // Fetch all schools
        const schools = await School.find();
    
        // Filter schools within specified radius
        const nearbySchools = schools.filter(school => {
          const distance = calculateDistance(
            parseFloat(latitude), 
            parseFloat(longitude),
            school.latitude, 
            school.longitude
          );
    
          // Add distance to school object
          school._doc.distance = distance;
    
          // Return schools within radius
          return distance <= radius;
        });
    
        // Sort by distance
        nearbySchools.sort((a, b) => a.distance - b.distance);
    
        res.json(nearbySchools);
      } catch (error) {
        res.status(500).json({ 
          error: 'Server error', 
          message: error.message 
        });
      }
};