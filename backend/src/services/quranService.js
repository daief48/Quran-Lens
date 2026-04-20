const NodeCache = require('node-cache');
const quranCache = new NodeCache({ stdTTL: 86400 }); // Default 24 hours

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

const fetchAllSurahs = async () => {
  const cacheKey = 'all_surahs';
  const cachedData = quranCache.get(cacheKey);
  
  if (cachedData) {
    console.log('[Cache Hit] All Surahs');
    return cachedData;
  }

  const response = await fetch(`${QURAN_API_BASE}/surah`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error fetching surahs from external API');
  
  quranCache.set(cacheKey, data.data);
  return data.data;
};

const fetchSurahDetails = async (id) => {
  const cacheKey = `surah_${id}`;
  const cachedData = quranCache.get(cacheKey);

  if (cachedData) {
    console.log(`[Cache Hit] Surah Details: ${id}`);
    return cachedData;
  }

  const [arabicRes, englishRes] = await Promise.all([
    fetch(`${QURAN_API_BASE}/surah/${id}`),
    fetch(`${QURAN_API_BASE}/surah/${id}/en.sahih`)
  ]);

  const arabicData = await arabicRes.json();
  const englishData = await englishRes.json();

  if (!arabicRes.ok || !englishRes.ok) {
    throw new Error('Error fetching surah details from external API');
  }

  const result = {
    ...arabicData.data,
    ayahs: arabicData.data.ayahs.map((ayah, index) => ({
      ...ayah,
      translation: englishData.data.ayahs[index].text
    }))
  };

  quranCache.set(cacheKey, result);
  return result;
};

const searchAyahs = async (query) => {
  const cacheKey = `search_${query.toLowerCase()}`;
  const cachedData = quranCache.get(cacheKey);

  if (cachedData) {
    console.log(`[Cache Hit] Search: ${query}`);
    return cachedData;
  }

  const response = await fetch(`${QURAN_API_BASE}/search/${query}/all/en.sahih`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Search failed at external API');
  
  // Cache search results for 6 hours
  quranCache.set(cacheKey, data.data, 21600);
  return data.data;
};

module.exports = {
  fetchAllSurahs,
  fetchSurahDetails,
  searchAyahs
};
