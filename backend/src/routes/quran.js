const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

// For simplicity and speed, we'll fetch from a public API
// but we could also serve local JSON if needed.
const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

// Get all Surahs
router.get('/surahs', async (req, res) => {
  try {
    const response = await fetch(`${QURAN_API_BASE}/surah`);
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching surahs', error: error.message });
  }
});

// Get Surah details (Ayahs) with translation
router.get('/surah/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch Arabic text and English translation together
    const [arabicRes, englishRes] = await Promise.all([
      fetch(`${QURAN_API_BASE}/surah/${id}`),
      fetch(`${QURAN_API_BASE}/surah/${id}/en.sahih`)
    ]);
    
    const arabicData = await arabicRes.json();
    const englishData = await englishRes.json();
    
    res.json({
      ...arabicData.data,
      ayahs: arabicData.data.ayahs.map((ayah, index) => ({
        ...ayah,
        translation: englishData.data.ayahs[index].text
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching surah details', error: error.message });
  }
});

// Search functionality matches requirements
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Search query is required' });

  try {
    const response = await fetch(`${QURAN_API_BASE}/search/${q}/all/en.sahih`);
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ message: 'Search error', error: error.message });
  }
});

// Bookmarks routes
router.post('/bookmarks', async (req, res) => {
  try {
    const { surahNumber, ayahNumber, surahName } = req.body;
    const bookmark = new Bookmark({ surahNumber, ayahNumber, surahName });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error) {
    res.status(400).json({ message: 'Error saving bookmark', error: error.message });
  }
});

router.get('/bookmarks', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find().sort({ timestamp: -1 });
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookmarks', error: error.message });
  }
});

module.exports = router;
