'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Settings, Book, Menu, Sparkles } from 'lucide-react';
import SettingsSidebar from './SettingsSidebar';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-6 ${scrolled ? 'pt-4' : 'pt-6'}`}>
        <header 
          className={`max-w-7xl mx-auto rounded-[2rem] transition-all duration-500 border ${
            scrolled 
              ? 'glass shadow-2xl py-3 px-8' 
              : 'bg-white/50 border-transparent py-4 px-8'
          }`}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform duration-500">
                  <Book size={24} />
                </div>
                <div className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                  Quran Lens
                  <Sparkles size={16} className="text-amber-500" />
                </h1>
                <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase">Reflect & Explore</p>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Link 
                href="/search" 
                className="flex items-center gap-2 px-5 py-2.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all font-semibold text-sm"
              >
                <Search size={18} />
                <span className="hidden md:inline">Quick Search</span>
              </Link>
              
              <div className="w-px h-6 bg-slate-200 mx-2 hidden md:block"></div>
              
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-2xl transition-all"
                aria-label="Settings"
              >
                <Settings size={22} />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Spacer to prevent content jump */}
      <div className="h-28"></div>

      <SettingsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
