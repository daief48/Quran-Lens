const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Initialize Express
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Quran Lens API is running with Noble Architecture...');
});

const quranRoutes = require('./routes/quran');
app.use('/api/quran', quranRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// For local development
if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running in development mode on port ${PORT}`);
  });
}

module.exports = app;
