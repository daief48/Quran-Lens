'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      
      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <nav className="flex items-center gap-2 sm:gap-4 select-none animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-700">
      <Link
        href={currentPage > 1 ? `/?page=${currentPage - 1}` : '#'}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all ${
          currentPage > 1 
            ? 'glass text-[#042f2e] dark:text-emerald-400 hover:bg-[#a4773f]/10 translate-x-0 active:scale-95' 
            : 'opacity-20 cursor-not-allowed text-slate-400'
        }`}
        aria-label="Previous Page"
      >
        <ChevronLeft size={24} />
      </Link>

      <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-[2rem] border border-[#a4773f]/20 shadow-xl">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-[#8a6335]/60 font-black">•••</span>
          ) : (
            <Link
              key={page}
              href={`/?page=${page}`}
              className={`min-w-[40px] sm:min-w-[48px] h-10 sm:h-12 flex items-center justify-center rounded-xl sm:rounded-2xl font-sacred font-black text-sm sm:text-lg transition-all relative group ${
                currentPage === page
                  ? 'bg-[#042f2e] text-amber-400 shadow-lg scale-110 border border-amber-500/30'
                  : 'text-[#042f2e] dark:text-slate-400 hover:bg-[#a4773f]/10'
              }`}
            >
              {page}
              {currentPage === page && (
                <div className="absolute -top-1 -right-1">
                  <Sparkles size={10} className="text-white animate-pulse" />
                </div>
              )}
            </Link>
          )
        ))}
      </div>

      <Link
        href={currentPage < totalPages ? `/?page=${currentPage + 1}` : '#'}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all ${
          currentPage < totalPages 
            ? 'glass text-[#042f2e] dark:text-emerald-400 hover:bg-[#a4773f]/10 translate-x-0 active:scale-95' 
            : 'opacity-20 cursor-not-allowed text-slate-400'
        }`}
        aria-label="Next Page"
      >
        <ChevronRight size={24} />
      </Link>
    </nav>
  );
}
