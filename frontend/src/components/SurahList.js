'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SurahCard from './SurahCard';
import Pagination from './Pagination';
import { fetchSurahs } from '@/lib/api';
import { Sparkles } from 'lucide-react';

export default function SurahList() {
  const searchParams = useSearchParams();
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const itemsPerPage = 12;

  useEffect(() => {
    async function loadSurahs() {
      try {
        setLoading(true);
        const data = await fetchSurahs();
        setSurahs(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadSurahs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bento-card bg-red-50 dark:bg-red-950/20 text-red-600 p-12 text-center border-red-100 dark:border-red-900/30 max-w-xl mx-auto">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="text-red-600" size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-4 italic">Connection Interrupted</h3>
        <p className="font-medium mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
        >
          Try Reconnecting
        </button>
      </div>
    );
  }

  const totalSurahs = surahs.length;
  const totalPages = Math.ceil(totalSurahs / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSurahs = surahs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 ease-out">
        {currentSurahs.map((surah) => (
          <SurahCard key={surah.number} surah={surah} />
        ))}
      </div>
      
      <div className="mt-20 flex justify-center">
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
