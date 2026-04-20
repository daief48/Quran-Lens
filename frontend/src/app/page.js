'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import SurahCard from '@/components/SurahCard';
import { fetchSurahs } from '@/lib/api';
import { Loader2, Sparkles, Compass } from 'lucide-react';

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
    <main className="min-h-screen pb-20 bg-pattern">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Dynamic Hero Section */}
        <div className="relative mb-20">
          <div className="absolute inset-0 -z-10 flex justify-center overflow-hidden blur-3xl opacity-20">
            <div className="w-[80%] aspect-square bg-gradient-to-tr from-emerald-600 to-amber-400 rounded-full animate-blob"></div>
          </div>
          
          <div className="text-center pt-10 pb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest mb-6 border border-emerald-100 dark:border-emerald-900/30">
              <Compass size={14} />
              Spiritual Journey
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">
              The Noble <span className="text-emerald-600 italic">Quran</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
              Experience the divine wisdom through a modern lens. Explore 114 Surahs with crystal clear typography, translation, and meaningful reflection.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
            <div className="relative">
              <Loader2 className="animate-spin text-emerald-600" size={64} strokeWidth={1} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="text-amber-500 animate-pulse" size={24} />
              </div>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Preparing Heavenly Texts...</p>
          </div>
        ) : error ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 ease-out">
            {surahs.map((surah) => (
              <SurahCard key={surah.number} surah={surah} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
