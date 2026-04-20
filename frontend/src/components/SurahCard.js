'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';

const SurahCard = memo(function SurahCard({ surah }) {
  return (
    <Link 
      href={`/surah/${surah.number}`}
      className="bento-card group p-6 sm:p-10 border-[#a4773f]/10 hover:border-[#a4773f]/40 relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
    >
      {/* Intricate Corner Motif (Mashrabiya Style) */}
      <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-[#a4773f]/20 rounded-tr-3xl group-hover:border-[#a4773f]/60 transition-colors duration-700"></div>
      <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-[#a4773f]/20 rounded-bl-3xl group-hover:border-[#a4773f]/60 transition-colors duration-700"></div>

      <div className="flex flex-col h-full justify-between gap-8 sm:gap-12 relative z-10">
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="w-12 h-12 sm:w-20 sm:h-20 flex items-center justify-center bg-[#042f2e] text-[#a4773f] font-sacred font-black rounded-2xl sm:rounded-[2.5rem] rotate-12 group-hover:rotate-0 transition-all duration-700 shadow-2xl relative overflow-hidden border border-[#a4773f]/30">
              <span className="-rotate-12 group-hover:rotate-0 transition-transform duration-700 text-lg sm:text-2xl">
                {surah.number}
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"></div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl sm:text-4xl font-arabic text-[#042f2e] dark:text-[#a5f3e0] leading-tight mb-2" style={{ fontFamily: 'var(--font-amiri)' }}>
              {surah.name}
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/50 dark:bg-emerald-950 rounded-full border border-emerald-200/50 dark:border-emerald-900/30">
              <div className={`w-1.5 h-1.5 rounded-full ${surah.revelationType === 'Meccan' ? 'bg-amber-600' : 'bg-emerald-700'}`}></div>
              <p className="text-[9px] text-emerald-900 dark:text-emerald-300 font-black tracking-widest uppercase">
                {surah.revelationType}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-[#a4773f]/20 pt-8">
          <div className="max-w-[70%]">
            <h3 className="text-2xl sm:text-3xl font-sacred font-black text-slate-900 dark:text-white group-hover:text-[#a4773f] transition-all mb-2 tracking-tight">
              {surah.englishName}
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-400 font-medium italic flex items-center gap-2">
              {surah.englishNameTranslation}
              <span className="w-1.5 h-1.5 bg-[#a4773f] rounded-full opacity-40"></span>
              <span className="font-bold text-[#042f2e] dark:text-emerald-500">{surah.numberOfAyahs} Verses</span>
            </p>
          </div>
          
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#042f2e]/5 dark:bg-white/5 border border-[#a4773f]/10 flex items-center justify-center text-[#a4773f] group-hover:bg-[#042f2e] group-hover:text-white transition-all transform group-hover:-translate-y-2 shadow-sm group-hover:shadow-emerald-900/20">
            <ArrowUpRight size={24} className="group-hover:scale-125 transition-transform" />
          </div>
        </div>
      </div>

      {/* Divine Aura hover effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
    </Link>
  );
});

export default SurahCard;
