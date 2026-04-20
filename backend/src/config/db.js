const mongoose = require('mongoose');

let cachedConnection = null;

// Fallback URI for direct Netlify upload deployment
const MONGODB_URI = process.env.MONGODB_URI || 
  'mongodb+srv://daiefsikder425:daief420vai@cluster0.eivduzo.mongodb.net/quran_lens_bd?appName=Cluster0';

const connectDB = async () => {
  if (cachedConnection) {
    console.log('[Database] Using cached connection');
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    cachedConnection = conn;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;
