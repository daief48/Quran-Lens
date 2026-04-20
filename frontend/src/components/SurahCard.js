'use client';

import React from 'react';
import Link from 'next/link';

export default function SurahCard({ surah }) {
  return (
    <Link 
      href={`/surah/${surah.number}`}
      className="group p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-900 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl rotate-45 group-hover:rotate-0 transition-transform duration-500">
          <span className="-rotate-45 group-hover:rotate-0 transition-transform duration-500 uppercase">
            {surah.number}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
            {surah.englishName}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {surah.englishNameTranslation} • {surah.numberOfAyahs} Ayahs
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-2xl font-arabic text-emerald-900 dark:text-emerald-400 leading-none mb-1" style={{ fontFamily: 'Amiri' }}>
          {surah.name}
        </div>
        <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
          {surah.revelationType}
        </p>
      </div>
    </Link>
  );
}
