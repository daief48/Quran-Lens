'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Settings, Book, Menu } from 'lucide-react';
import SettingsSidebar from './SettingsSidebar';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 glass shadow-sm py-4 px-6 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:bg-emerald-700 transition-colors">
              <Book size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-900 dark:text-emerald-400">Quran Lens</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wider">REFLECT & EXPLORE</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link 
              href="/search" 
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search size={22} />
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Settings"
            >
              <Settings size={22} />
            </button>
          </div>
        </div>
      </header>

      <SettingsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
