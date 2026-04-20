const express = require('express');
const router = express.Router();
const quranController = require('../controllers/quranController');

// All available Surahs
router.get('/surahs', quranController.getAllSurahs);

// Specific Surah details (Ayahs)
router.get('/surah/:id', quranController.getSurahDetails);

// Global search
router.get('/search', quranController.searchAyahs);

// Bookmarks management
router.post('/bookmarks', quranController.addBookmark);
router.get('/bookmarks', quranController.getBookmarks);

module.exports = router;
