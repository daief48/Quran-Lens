'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Settings, Book, Menu, Sparkles, X, Heart } from 'lucide-react';
import SettingsSidebar from './SettingsSidebar';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-in-out px-4 sm:px-6 ${scrolled ? 'pt-2 sm:pt-4' : 'pt-4 sm:pt-8'}`}>
        <header 
          className={`max-w-5xl mx-auto rounded-[1.5rem] sm:rounded-[2.5rem] transition-all duration-700 border ${
            scrolled 
              ? 'glass shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] py-2 sm:py-3 px-4 sm:px-8' 
              : 'bg-white/40 dark:bg-slate-900/40 border-slate-200/20 dark:border-white/5 py-3 sm:py-5 px-4 sm:px-10'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2 sm:gap-4 group">
              <div className="relative">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/20 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                  <Book size={20} className="sm:hidden" />
                  <Book size={28} className="hidden sm:block" />
                </div>
                <div className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-4 sm:w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-amber-500"></span>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1 sm:gap-2">
                  Quran
                  <span className="text-emerald-600 italic">Lens</span>
                  <Sparkles size={14} className="text-amber-500 animate-pulse" />
                </h1>
                <p className="text-[8px] sm:text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase hidden xs:block">Reflect & Explore</p>
              </div>
            </Link>

            {/* Navigation Actions */}
            <div className="flex items-center gap-1 sm:gap-3">
              <Link 
                href="/search" 
                className="flex items-center justify-center w-10 h-10 sm:w-auto sm:px-6 sm:py-3 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl sm:rounded-2xl transition-all font-bold text-sm group"
                aria-label="Search"
              >
                <Search size={20} className="group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline ml-2">Search Light</span>
              </Link>
              
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>
              
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl transition-all relative overflow-hidden group"
                aria-label="Settings"
              >
                <Settings size={20} className="sm:hidden group-hover:rotate-90 transition-transform duration-500" />
                <Settings size={24} className="hidden sm:block group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Responsive Spacer */}
      <div className="h-24 sm:h-36"></div>

      <SettingsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
