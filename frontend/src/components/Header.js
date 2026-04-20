'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Search, Settings, Book, Menu, Sparkles, X, Heart, ShieldHeader } from 'lucide-react';

const SettingsSidebar = dynamic(() => import('./SettingsSidebar'), {
  ssr: false,
});

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
      <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-1000 ease-in-out px-4 sm:px-6 ${scrolled ? 'pt-2 sm:pt-4' : 'pt-4 sm:pt-10'}`}>
        <header 
          className={`max-w-5xl mx-auto rounded-[1.5rem] sm:rounded-[3rem] transition-all duration-1000 border relative overflow-hidden ${
            scrolled 
              ? 'glass shadow-[0_25px_60px_rgba(0,0,0,0.15)] py-3 px-6 sm:px-10 border-white/50 dark:border-white/10' 
              : 'bg-white/60 dark:bg-slate-900/60 border-[#a4773f]/20 py-5 px-6 sm:px-12'
          }`}
        >
          {/* Animated Gold Line at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#a4773f]/40 to-transparent"></div>

          <div className="flex items-center justify-between">
            {/* Sacred Logo Section */}
            <Link href="/" className="flex items-center gap-3 sm:gap-5 group">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#042f2e] border-2 border-[#a4773f]/30 rounded-2xl sm:rounded-[2rem] flex items-center justify-center text-white shadow-2xl group-hover:scale-105 group-hover:rotate-6 transition-all duration-700">
                  <Book size={28} className="text-[#a4773f] group-hover:text-amber-400 transition-colors" />
                </div>
                <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 sm:h-5 sm:w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a4773f] opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 sm:h-5 sm:w-5 bg-[#a4773f] border-2 border-[#fdfcf0]"></span>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-3xl font-sacred font-black tracking-tight text-[#042f2e] dark:text-white flex items-center gap-1.5">
                  Quran
                  <span className="text-[#a4773f] italic font-serif">Lens</span>
                </h1>
                <div className="flex items-center gap-2">
                  <p className="text-[8px] sm:text-[10px] text-[#8a6335] dark:text-[#a4773f] font-black tracking-[0.4em] uppercase">Reflect & Explore</p>
                  <Sparkles size={10} className="text-amber-500 animate-pulse" />
                </div>
              </div>
            </Link>

            {/* Noble Navigation */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link 
                href="/search" 
                className="flex items-center justify-center w-11 h-11 sm:w-auto sm:px-8 sm:py-3.5 text-slate-800 dark:text-slate-300 hover:text-white hover:bg-[#042f2e] dark:hover:bg-emerald-600 rounded-xl sm:rounded-3xl transition-all font-sacred font-bold text-sm group shadow-sm hover:shadow-emerald-900/30 border border-transparent hover:border-[#a4773f]/30"
                aria-label="Search"
              >
                <Search size={22} className="group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline ml-3 tracking-wide">Sacred Search</span>
              </Link>
              
              <div className="w-px h-8 bg-[#a4773f]/20 mx-1 hidden sm:block"></div>
              
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center text-[#a4773f] hover:bg-[#a4773f]/10 rounded-xl sm:rounded-3xl transition-all relative overflow-hidden group border border-transparent hover:border-[#a4773f]/30"
                aria-label="Settings"
              >
                <Settings size={22} className="sm:hidden group-hover:rotate-90 transition-transform duration-700" />
                <Settings size={28} className="hidden sm:block group-hover:rotate-90 transition-transform duration-700" />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="h-32 sm:h-44"></div>

      <SettingsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
