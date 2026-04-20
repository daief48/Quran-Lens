'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import Header from '@/components/Header';
import { searchAyahs } from '@/lib/api';
import { Search as SearchIcon, Loader2, BookOpen, ChevronRight, Sparkles, Filter } from 'lucide-react';
import Link from 'next/link';

// Memoized Individual Result Item
const SearchResultItem = memo(({ result, query, highlightText }) => (
  <Link 
    href={`/surah/${result.surah.number}#ayah-${result.numberInSurah}`}
    className="bento-card p-8 sm:p-12 group relative bg-white/80 dark:bg-slate-900/40 backdrop-blur-md border-[#a4773f]/10 hover:border-[#a4773f]/40"
  >
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-[1.5rem] sm:rounded-[2rem] bg-[#042f2e] text-[#a4773f] flex items-center justify-center font-sacred font-black text-lg sm:text-xl group-hover:scale-110 transition-transform shadow-2xl border border-[#a4773f]/20">
          {result.numberInSurah}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] font-black text-[#8a6335] dark:text-[#a4773f] uppercase tracking-[0.3em]">Revelation In</span>
            <Sparkles size={10} className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-sacred font-black text-[#042f2e] dark:text-white text-lg sm:text-2xl tracking-tight group-hover:text-[#a4773f] transition-colors">
            {result.surah.englishName} <span className="text-[#a4773f]/30 mx-2 font-serif font-light">/</span> {result.surah.number}:{result.numberInSurah}
          </span>
        </div>
      </div>
      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#a4773f]/5 dark:bg-white/5 flex items-center justify-center text-[#a4773f] group-hover:bg-[#042f2e] group-hover:text-white group-hover:translate-x-2 transition-all shadow-sm">
        <ChevronRight size={28} />
      </div>
    </div>
    
    <div className="relative pl-6 sm:pl-10">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#a4773f] to-transparent rounded-full opacity-40"></div>
      <span className="text-[#a4773f]/20 text-6xl sm:text-8xl font-serif absolute -top-8 sm:-top-12 -left-6 sm:-left-10 select-none tracking-tighter">&ldquo;</span>
      <p className="text-lg sm:text-2xl text-slate-900 dark:text-slate-300 leading-relaxed italic relative z-10 font-sacred drop-shadow-sm">
        {highlightText(result.text, query)}
      </p>
    </div>
  </Link>
));

// Memoized Search Form to prevent parent re-renders while typing
const SearchForm = memo(({ initialQuery, onSearch }) => {
  const [localQuery, setLocalQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  return (
    <div className="mb-20 sm:mb-28 text-center relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[#a4773f] to-transparent"></div>
      
      <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#042f2e] text-[#a4773f] font-sacred font-black text-[9px] sm:text-[11px] tracking-[0.4em] uppercase mb-12 shadow-2xl border border-[#a4773f]/30">
        <Sparkles size={14} className="text-amber-500 animate-pulse" />
        The Sacred Library
      </div>
      
      <h2 className="text-5xl sm:text-7xl font-sacred font-black text-[#042f2e] dark:text-white mb-10 sm:mb-16 tracking-tighter italic leading-tight text-sacred">
        Unveil <span className="text-[#a4773f]">The Truth</span>
      </h2>
      
      <form onSubmit={handleSubmit} className="relative group max-w-3xl mx-auto">
        <div className="absolute inset-0 bg-[#a4773f]/10 rounded-[2.5rem] sm:rounded-[3.5rem] blur-3xl group-focus-within:bg-[#a4773f]/20 transition-all duration-1000 -z-10"></div>
        <input 
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search sacred knowledge..."
          className="w-full p-6 sm:p-10 pl-14 sm:pl-20 pr-28 sm:pr-40 rounded-[2.5rem] sm:rounded-[3.5rem] bg-white/90 dark:bg-slate-900 border-2 border-[#a4773f]/20 focus:border-[#a4773f] focus:ring-[15px] focus:ring-[#a4773f]/5 transition-all outline-none text-lg sm:text-2xl font-sacred font-medium shadow-2xl placeholder:text-slate-300 dark:placeholder:text-slate-700"
        />
        <SearchIcon className="absolute left-5 sm:left-8 top-1/2 -translate-y-1/2 text-[#a4773f] group-focus-within:scale-110 transition-transform" size={28} />
        <button 
          type="submit"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 px-6 sm:px-10 py-4 sm:py-5 bg-[#042f2e] text-[#a4773f] font-sacred font-black rounded-3xl sm:rounded-[2.5rem] hover:scale-105 active:scale-95 transition-all shadow-2xl border border-[#a4773f]/30 text-xs sm:text-lg tracking-widest"
        >
          Discover
        </button>
      </form>
    </div>
  );
});

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [activeQuery, setActiveQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setActiveQuery(query);
    try {
      const data = await searchAyahs(query);
      setResults(data.matches || data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const highlightText = useCallback((text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
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
  }, []);

  return (
    <main className="min-h-screen pb-32 bg-mashrabiya overflow-x-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#042f2e]/10 via-transparent to-transparent pointer-events-none"></div>
      <Header />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <SearchForm initialQuery={activeQuery} onSearch={handleSearch} />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-8">
            <Loader2 className="animate-spin text-[#042f2e] dark:text-emerald-500" size={64} strokeWidth={1} />
            <p className="text-[#a4773f] font-sacred font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">Illuminating Ayahs...</p>
          </div>
        ) : error ? (
          <div className="bento-card p-12 bg-red-50/80 dark:bg-red-950/20 text-red-700 border-red-100 dark:border-red-900/30 text-center max-w-xl mx-auto shadow-2xl">
            <h3 className="text-2xl font-sacred font-black italic mb-3 text-sacred">Divine Error</h3>
            <p className="font-semibold text-sm opacity-80 leading-relaxed">{error}</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-12">
            <div className="flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#a4773f]"></div>
                <p className="text-[#042f2e] dark:text-slate-400 font-sacred font-black uppercase tracking-[0.4em] text-[10px]">
                  {results.length} Sacred Revelations Found
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#a4773f] text-xs font-sacred font-bold">
                <Filter size={16} />
                <span className="tracking-widest">Sahih Intl.</span>
              </div>
            </div>
            
            <div className="grid gap-10">
              {results.map((result, idx) => (
                <SearchResultItem 
                  key={`${result.surah.number}-${result.numberInSurah}-${idx}`}
                  result={result}
                  query={activeQuery}
                  highlightText={highlightText}
                />
              ))}
            </div>
          </div>
        ) : activeQuery && !loading ? (
          <div className="py-32 text-center animate-in fade-in zoom-in duration-1000">
            <div className="w-32 h-32 bg-white/50 dark:bg-slate-800/50 rounded-[3rem] flex items-center justify-center mx-auto mb-10 border-2 border-dashed border-[#a4773f]/20">
               <BookOpen size={56} className="text-[#a4773f]/30" />
            </div>
            <p className="font-sacred font-black text-3xl text-[#042f2e] dark:text-white italic mb-4 text-sacred">Divine Wisdom Obscured</p>
            <p className="text-[#a4773f] font-sacred font-bold italic tracking-wide opacity-70">Try seeking deeper with terms like &ldquo;light&rdquo;, &ldquo;mercy&rdquo;, or &ldquo;path&rdquo;.</p>
          </div>
        ) : (
          <div className="py-40 text-center border-4 border-dashed border-[#a4773f]/10 rounded-[4rem] animate-in fade-in zoom-in duration-1000 relative overflow-hidden group">
            <div className="absolute inset-0 bg-mashrabiya opacity-5"></div>
            <SearchIcon size={100} className="mx-auto mb-10 text-[#a4773f]/20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000" strokeWidth={0.5} />
            <p className="font-sacred font-black uppercase tracking-[0.5em] text-[11px] text-[#a4773f]/40 relative z-10">Commence your spiritual search</p>
          </div>
        )}
      </div>
    </main>
  );
}
