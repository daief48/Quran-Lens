'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Share2, Bookmark, Check, BookMarked, Sparkle } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function AyahCard({ ayah, surahName, surahNumber }) {
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
      className="bento-card p-10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md group relative"
    >
      {/* Background soft glow */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-600/5 rounded-full blur-3xl -ml-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center font-extrabold text-lg shadow-xl shadow-slate-900/20 dark:shadow-emerald-900/40">
              {ayah.numberInSurah}
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-0.5">Reference</span>
              <span className="text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
                {surahName} • {surahNumber}:{ayah.numberInSurah}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <button 
              onClick={handleCopy}
              className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm shadow-transparent hover:shadow-black/5"
              title="Copy"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <button 
              onClick={handleShare}
              className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm shadow-transparent hover:shadow-black/5"
              title="Share"
            >
              <Share2 size={18} />
            </button>
            <button 
              onClick={toggleBookmark}
              className={`p-3 rounded-xl transition-all shadow-sm ${isBookmarked ? 'text-emerald-600 bg-white dark:bg-slate-800 shadow-black/5' : 'text-slate-400 hover:text-emerald-600 hover:bg-white dark:hover:bg-slate-800 shadow-transparent hover:shadow-black/5'}`}
              title="Bookmark"
            >
              {isBookmarked ? <BookMarked size={18} /> : <Bookmark size={18} />}
            </button>
          </div>
        </div>

        <div 
          className="arabic text-right leading-loose text-slate-900 dark:text-slate-100 selection:bg-emerald-100 selection:text-emerald-900"
          style={{ 
            fontFamily: settings.arabicFont === 'Amiri' ? 'Amiri' : '"Scheherazade New"',
            fontSize: `${settings.arabicFontSize}px`,
            lineHeight: settings.arabicFont === 'Amiri' ? '2.4' : '1.9'
          }}
        >
          {ayah.text}
        </div>

        <div className="flex gap-6">
          <div className="w-1.5 rounded-full bg-gradient-to-b from-emerald-600 to-teal-500 opacity-20"></div>
          <div 
            className="text-slate-600 dark:text-slate-400 font-semibold leading-relaxed"
            style={{ fontSize: `${settings.translationFontSize}px` }}
          >
            <span className="text-emerald-600/50 mr-2 text-xl font-serif inline-block transform -translate-y-1">&ldquo;</span>
            <span className="italic">{ayah.translation}</span>
            <span className="text-emerald-600/50 ml-1 text-xl font-serif inline-block transform translate-y-2">&rdquo;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
