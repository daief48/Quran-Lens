'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { searchAyahs } from '@/lib/api';
import { Search as SearchIcon, Loader2, BookOpen, ChevronRight } from 'lucide-react';
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
      setResults(data.results || []); // alquran.cloud returns results in .results
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Highlighting helper
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          <span 
            key={i} 
            className={part.toLowerCase() === highlight.toLowerCase() ? 'bg-emerald-100 text-emerald-800 font-bold px-1 rounded' : ''}
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <main className="min-h-screen pb-20">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <SearchIcon className="text-emerald-600" size={32} />
            Search Truth
          </h2>
          
          <form onSubmit={handleSearch} className="relative group">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search via translation (e.g. 'patience', 'mercy', 'heart')..."
              className="w-full p-6 pl-16 rounded-[2rem] bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-lg shadow-sm group-hover:shadow-md"
            />
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={24} />
            <button 
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-2 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-900/20"
            >
              Search
            </button>
          </form>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-emerald-600" size={40} />
            <p className="text-slate-400 font-medium">Searching across all ayahs...</p>
          </div>
        ) : error ? (
          <div className="p-8 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-center">
            {error}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs px-2">
              Found {results.length} matches
            </p>
            {results.map((result, idx) => (
              <Link 
                key={idx}
                href={`/surah/${result.surah.number}#ayah-${result.numberInSurah}`}
                className="block p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                      {result.numberInSurah}
                    </div>
                    <span className="font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {result.surah.englishName} ({result.surah.number}:{result.numberInSurah})
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{highlightText(result.text, query)}&rdquo;
                </p>
              </Link>
            ))}
          </div>
        ) : query && !loading ? (
          <div className="py-20 text-center text-slate-400">
            <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-medium text-lg">No matches found for &quot;{query}&quot;</p>
            <p className="text-sm">Try searching for keywords like &quot;mercy&quot;, &quot;prayer&quot;, or &quot;paradise&quot;.</p>
          </div>
        ) : (
          <div className="py-20 text-center text-slate-300 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem]">
            <SearchIcon size={64} className="mx-auto mb-4 opacity-10" />
            <p className="font-bold uppercase tracking-widest text-sm">Enter a keyword to explore related ayahs</p>
          </div>
        )}
      </div>
    </main>
  );
}
