'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import SurahCard from '@/components/SurahCard';
import { fetchSurahs } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchSurahs();
        setSurahs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen pb-20">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            The Noble Quran
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            Explore and reflect upon the 114 Surahs of the Holy Quran with clear Arabic text and professional English Sahih International translations.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="animate-spin text-emerald-600" size={48} />
            <p className="text-slate-400 font-medium animate-pulse">Fetching Surahs...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100 max-w-md mx-auto">
            <p className="font-bold mb-2">Error Loading Data</p>
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surahs.map((surah) => (
              <SurahCard key={surah.number} surah={surah} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
