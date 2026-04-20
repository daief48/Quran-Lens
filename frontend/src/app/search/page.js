'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { searchAyahs } from '@/lib/api';
import { Search as SearchIcon, Loader2, BookOpen, ChevronRight, Sparkles, Filter } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await searchAyahs(query);
      setResults(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          <span 
            key={i} 
            className={part.toLowerCase() === highlight.toLowerCase() ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-extrabold px-1.5 rounded-md' : ''}
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <main className="min-h-screen pb-32 bg-pattern">
      <Header />
      
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-[10px] tracking-[0.3em] uppercase mb-10 shadow-xl shadow-slate-900/20">
            <Sparkles size={14} className="text-amber-400" />
            Global Search
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-12 tracking-tight italic">
            Search <span className="text-emerald-600">The Truth</span>
          </h2>
          
          <form onSubmit={handleSearch} className="relative group max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-emerald-600/10 dark:bg-emerald-500/5 rounded-[2.5rem] blur-2xl group-focus-within:bg-emerald-600/20 transition-all duration-700 -z-10"></div>
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search concepts e.g. 'patience', 'light', 'prayer'..."
              className="w-full p-8 pl-16 pr-32 rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-emerald-500 focus:ring-8 focus:ring-emerald-500/5 transition-all outline-none text-xl font-medium shadow-sm group-hover:shadow-xl dark:shadow-black/20"
            />
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={28} />
            <button 
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 px-8 py-4 bg-slate-900 dark:bg-emerald-600 text-white font-extrabold rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10 dark:shadow-emerald-900/20"
            >
              Discover
            </button>
          </form>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <Loader2 className="animate-spin text-emerald-600" size={56} strokeWidth={1.5} />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Parsing all ayahs...</p>
          </div>
        ) : error ? (
          <div className="bento-card p-10 bg-red-50 dark:bg-red-950/20 text-red-600 border-red-100 dark:border-red-900/30 text-center max-w-xl mx-auto">
            <h3 className="text-xl font-black italic mb-2">Search Logic Error</h3>
            <p className="font-semibold">{error}</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between px-4">
              <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                Showing {results.length} matches
              </p>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                <Filter size={14} />
                <span>Sahih Intl.</span>
              </div>
            </div>
            
            <div className="grid gap-6">
              {results.map((result, idx) => (
                <Link 
                  key={idx}
                  href={`/surah/${result.surah.number}#ayah-${result.numberInSurah}`}
                  className="bento-card p-10 group relative bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        {result.numberInSurah}
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Revealed In</span>
                        <span className="font-extrabold text-slate-900 dark:text-white text-lg group-hover:text-emerald-600 transition-colors">
                          {result.surah.englishName} <span className="text-slate-300 dark:text-slate-700 mx-2 font-light">/</span> {result.surah.number}:{result.numberInSurah}
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <span className="text-emerald-600/20 text-6xl font-serif absolute -top-8 -left-2">&ldquo;</span>
                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed italic relative z-10 pl-4 border-l-2 border-emerald-100 dark:border-emerald-900/20">
                      {highlightText(result.text, query)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : query && !loading ? (
          <div className="py-20 text-center animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-slate-100 dark:border-slate-800">
               <BookOpen size={40} className="text-slate-300" />
            </div>
            <p className="font-extrabold text-2xl text-slate-800 dark:text-white italic mb-2">Wisdom Not Found</p>
            <p className="text-slate-400 font-medium">Try searching for broader terms like &quot;heaven&quot; or &quot;earth&quot;.</p>
          </div>
        ) : (
          <div className="py-32 text-center border-4 border-dashed border-slate-100 dark:border-slate-800/50 rounded-[4rem] animate-in fade-in zoom-in duration-1000">
            <SearchIcon size={80} className="mx-auto mb-8 text-slate-200 dark:text-slate-800" strokeWidth={1} />
            <p className="font-black uppercase tracking-[0.4em] text-xs text-slate-300">Awaiting your search intent</p>
          </div>
        )}
      </div>
    </main>
  );
}
