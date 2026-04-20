'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Share2, Bookmark, Check, BookMarked } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function AyahCard({ ayah, surahName, surahNumber }) {
  const { settings } = useSettings();
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if bookmarked on mount
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('quran-lens-bookmarks') || '[]');
    const exists = bookmarks.some(b => b.surahNumber === surahNumber && b.ayahNumber === ayah.numberInSurah);
    setIsBookmarked(exists);
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
        url: typeof window !== 'undefined' ? window.location.origin + `/surah/${surahNumber}#ayah-${ayah.numberInSurah}` : '',
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
      const newBookmark = { 
        surahNumber, 
        ayahNumber: ayah.numberInSurah, 
        surahName,
        text: ayah.text,
        translation: ayah.translation,
        timestamp: new Date().getTime() 
      };
      bookmarks.push(newBookmark);
      localStorage.setItem('quran-lens-bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  return (
    <div 
      id={`ayah-${ayah.numberInSurah}`}
      className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-700/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              {ayah.numberInSurah}
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {surahName} • {surahNumber}:{ayah.numberInSurah}
            </span>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleCopy}
              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-all"
              title="Copy"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <button 
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-all"
              title="Share"
            >
              <Share2 size={18} />
            </button>
            <button 
              onClick={toggleBookmark}
              className={`p-2 rounded-lg transition-all ${isBookmarked ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30' : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'}`}
              title="Bookmark"
            >
              {isBookmarked ? <BookMarked size={18} /> : <Bookmark size={18} />}
            </button>
          </div>
        </div>

        <div 
          className="arabic text-right leading-relaxed text-slate-800 dark:text-slate-100"
          style={{ 
            fontFamily: settings.arabicFont === 'Amiri' ? 'Amiri' : '"Scheherazade New"',
            fontSize: `${settings.arabicFontSize}px`,
            lineHeight: settings.arabicFont === 'Amiri' ? '2.2' : '1.8'
          }}
        >
          {ayah.text}
        </div>

        <div 
          className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-l-4 border-emerald-100 dark:border-emerald-900/30 pl-6 py-2"
          style={{ fontSize: `${settings.translationFontSize}px` }}
        >
          {ayah.translation}
        </div>
      </div>
    </div>
  );
}
