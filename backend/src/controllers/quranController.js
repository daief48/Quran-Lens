const quranService = require('../services/quranService');
const Bookmark = require('../models/Bookmark');

// @desc    Get all Surahs
// @route   GET /api/quran/surahs
const getAllSurahs = async (req, res, next) => {
  try {
    const surahs = await quranService.fetchAllSurahs();
    res.json(surahs);
  } catch (error) {
    next(error);
  }
};

// @desc    Get Surah details
// @route   GET /api/quran/surah/:id
const getSurahDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const surah = await quranService.fetchSurahDetails(id);
    res.json(surah);
  } catch (error) {
    next(error);
  }
};

// @desc    Search Ayahs
// @route   GET /api/quran/search
const searchAyahs = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Search query is required' });
    
    const results = await quranService.searchAyahs(q);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

// @desc    Add Bookmark
// @route   POST /api/quran/bookmarks
const addBookmark = async (req, res, next) => {
  try {
    const { surahNumber, ayahNumber, surahName } = req.body;
    const bookmark = new Bookmark({ surahNumber, ayahNumber, surahName });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all Bookmarks
// @route   GET /api/quran/bookmarks
const getBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find().sort({ timestamp: -1 });
    res.json(bookmarks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSurahs,
  getSurahDetails,
  searchAyahs,
  addBookmark,
  getBookmarks
};
