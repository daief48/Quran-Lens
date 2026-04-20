const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchSurahs = async () => {
  const res = await fetch(`${API_BASE}/quran/surahs`);
  if (!res.ok) throw new Error('Failed to fetch surahs');
  return res.json();
};

export const fetchSurahDetails = async (id) => {
  const res = await fetch(`${API_BASE}/quran/surah/${id}`);
  if (!res.ok) throw new Error('Failed to fetch surah details');
  return res.json();
};

export const searchAyahs = async (query) => {
  const res = await fetch(`${API_BASE}/quran/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
};
