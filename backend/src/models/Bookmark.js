const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  surahNumber: { type: Number, required: true },
  ayahNumber: { type: Number, required: true },
  surahName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
