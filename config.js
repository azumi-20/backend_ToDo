require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI, // aquí usará la de Atlas en Render
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;