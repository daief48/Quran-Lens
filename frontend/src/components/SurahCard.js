'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

export default function SurahCard({ surah }) {
  return (
    <Link 
      href={`/surah/${surah.number}`}
      className="bento-card group p-5 sm:p-8"
    >
      <div className="flex flex-col h-full justify-between gap-6 sm:gap-8">
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl sm:rounded-2xl rotate-12 group-hover:rotate-0 transition-all duration-500 shadow-sm group-hover:shadow-lg">
              <span className="-rotate-12 group-hover:rotate-0 transition-transform duration-500 text-sm sm:text-base">
                {surah.number}
              </span>
            </div>
            {/* Pulsing indicator for revelation type */}
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 border-white dark:border-slate-800 ${surah.revelationType === 'Meccan' ? 'bg-amber-400' : 'bg-emerald-500'}`}></div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-arabic text-slate-800 dark:text-white leading-tight mb-1" style={{ fontFamily: 'var(--font-amiri)' }}>
              {surah.name}
            </div>
            <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase">
              {surah.revelationType}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-slate-50 dark:border-slate-800/50 pt-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors mb-1">
              {surah.englishName}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {surah.englishNameTranslation} • <span className="text-emerald-600/70 font-bold">{surah.numberOfAyahs} Ayahs</span>
            </p>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all transform group-hover:rotate-45">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>

      {/* Decorative hover effect background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </Link>
  );
}
