'use client';

import React, { useState, useEffect, memo } from 'react';
import { Copy, Share2, Bookmark, Check, BookMarked, Sparkles } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

const AyahCard = memo(function AyahCard({ ayah, surahName, surahNumber }) {
  const { settings } = useSettings();
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('quran-lens-bookmarks') || '[]');
    setIsBookmarked(bookmarks.some(b => b.surahNumber === surahNumber && b.ayahNumber === ayah.numberInSurah));
  }, [surahNumber, ayah.numberInSurah]);

  const handleCopy = () => {
    const text = `${ayah.text}\n\n${ayah.translation}\n\n(Quran ${surahNumber}:${ayah.numberInSurah})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Quran ${surahNumber}:${ayah.numberInSurah}`,
        text: `${ayah.text}\n${ayah.translation}`,
        url: window.location.origin + `/surah/${surahNumber}#ayah-${ayah.numberInSurah}`,
      });
    }
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('quran-lens-bookmarks') || '[]');
    if (isBookmarked) {
      const filtered = bookmarks.filter(b => !(b.surahNumber === surahNumber && b.ayahNumber === ayah.numberInSurah));
      localStorage.setItem('quran-lens-bookmarks', JSON.stringify(filtered));
      setIsBookmarked(false);
    } else {
      bookmarks.push({ 
        surahNumber, 
        ayahNumber: ayah.numberInSurah, 
        surahName,
        timestamp: Date.now() 
      });
      localStorage.setItem('quran-lens-bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  return (
    <div 
      id={`ayah-${ayah.numberInSurah}`}
      className="bento-card p-6 sm:p-12 bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl group relative border-[#a4773f]/10 hover:border-[#a4773f]/30"
    >
      {/* Decorative Side Ribbon */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#042f2e] via-[#a4773f] to-[#042f2e] opacity-40"></div>

      <div className="flex flex-col gap-8 sm:gap-14">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#a4773f]/5 pb-8">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative group/num">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-[1.5rem] sm:rounded-[2rem] bg-[#042f2e] text-amber-400 flex items-center justify-center font-sacred font-black text-xl sm:text-2xl shadow-2xl relative z-10 border border-amber-500/20 group-hover/num:scale-110 transition-transform duration-500">
                {ayah.numberInSurah}
              </div>
              <div className="absolute inset-0 bg-amber-500 rounded-[2rem] blur-xl opacity-0 group-hover/num:opacity-20 transition-opacity duration-1000"></div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-[#5c4225] dark:text-amber-500 uppercase tracking-[0.4em]">Sacred Verse</span>
                <Sparkles size={12} className="text-amber-500 animate-pulse" />
              </div>
              <span className="text-base sm:text-xl font-sacred font-black text-black dark:text-white tracking-tight">
                {surahName} <span className="text-amber-600/30 mx-1 sm:mx-2">•</span> {surahNumber}:{ayah.numberInSurah}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1.5 bg-[#fdfcf0] dark:bg-slate-800/80 rounded-2xl sm:rounded-3xl border border-[#a4773f]/10 self-start sm:self-auto shadow-inner">
            <button 
              onClick={handleCopy}
              className="p-3 sm:p-4 text-slate-600 dark:text-slate-400 hover:text-[#042f2e] dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl transition-all group/btn"
              title="Copy"
            >
              {copied ? <Check size={20} className="text-emerald-600" /> : <Copy size={20} className="group-hover/btn:scale-110 transition-transform" />}
            </button>
            <button 
              onClick={handleShare}
              className="p-3 sm:p-4 text-slate-600 dark:text-slate-400 hover:text-[#042f2e] dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl transition-all group/btn"
              title="Share"
            >
              <Share2 size={20} className="group-hover/btn:scale-110 transition-transform" />
            </button>
            <button 
              onClick={toggleBookmark}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all ${isBookmarked ? 'text-[#a4773f] bg-white dark:bg-slate-800 shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-[#a4773f] hover:bg-white dark:hover:bg-slate-800 group/btn'}`}
              title="Bookmark"
            >
              {isBookmarked ? <BookMarked size={22} /> : <Bookmark size={22} className="group-hover/btn:scale-110 transition-transform" />}
            </button>
          </div>
        </div>

        {/* Sacred Arabic Text */}
        <div 
          className="arabic text-right leading-[2.8] sm:leading-[3.2] text-[#042f2e] dark:text-[#a5f3e0] selection:bg-[#a4773f]/20 selection:text-[#042f2e]"
          style={{ 
            fontFamily: settings.arabicFont === 'Amiri' ? 'var(--font-amiri)' : 'var(--font-scheherazade)',
            fontSize: `${settings.arabicFontSize + 4}px`,
            textShadow: '0 0 1px rgba(164, 119, 63, 0.1)'
          }}
        >
          {ayah.text}
        </div>

        {/* Sacred Translation */}
        <div className="flex gap-8 relative mt-4">
          <div className="flex flex-col items-center gap-4">
            <div className="w-1.5 h-full rounded-full bg-[#a4773f]/20 relative">
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#a4773f]/40 to-transparent rounded-full"></div>
            </div>
          </div>
          <div 
            className="text-slate-900 dark:text-slate-300 font-medium leading-loose font-sacred py-2"
            style={{ fontSize: `${settings.translationFontSize + 2}px` }}
          >
            <div className="text-[#a4773f]/60 mb-3 select-none">
              <Share2 size={24} className="rotate-180 opacity-40" />
            </div>
            <span className="italic relative z-10 drop-shadow-sm">
               {ayah.translation}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Mashrabiya Corner Motif */}
      <svg className="absolute bottom-0 right-0 w-24 h-24 text-[#a4773f]/5 pointer-events-none" viewBox="0 0 100 100">
        <path d="M100 0 L100 100 L0 100 Z" fill="currentColor" />
      </svg>
    </div>
  );
});

export default AyahCard;
