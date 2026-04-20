import React from 'react';
import Header from '@/components/Header';
import SurahCard from '@/components/SurahCard';
import Pagination from '@/components/Pagination';
import { fetchSurahs } from '@/lib/api';
import { Sparkles, Compass } from 'lucide-react';

export default async function Home({ searchParams }) {
  let surahs = [];
  let error = null;
  
  // Await searchParams in Next.js 15+
  const sp = await searchParams;
  const currentPage = parseInt(sp.page) || 1;
  const itemsPerPage = 12;

  try {
    surahs = await fetchSurahs();
  } catch (err) {
    error = err.message;
  }

  const totalSurahs = surahs.length;
  const totalPages = Math.ceil(totalSurahs / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSurahs = surahs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="min-h-screen pb-32 bg-mashrabiya overflow-x-hidden relative">
      {/* Cinematic Deep Forest Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#042f2e]/10 via-transparent to-transparent pointer-events-none"></div>

      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Sacred Hero Section */}
        <div className="relative mb-20 sm:mb-28">
          <div className="absolute inset-0 -z-10 flex justify-center overflow-hidden blur-[100px] opacity-20">
            <div className="w-[100%] sm:w-[80%] aspect-square bg-gradient-to-tr from-[#042f2e] via-[#a4773f] to-amber-200 rounded-full animate-blob"></div>
          </div>
          
          <div className="text-center pt-10 sm:pt-16 pb-12 sm:pb-20 px-2 relative">
             {/* Traditional Border Motif */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#a4773f] to-transparent"></div>
            
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#042f2e] text-[#a4773f] font-sacred font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-10 border border-[#a4773f]/30 shadow-2xl">
              <Compass size={16} />
              The Spiritual Voyage
            </div>
            
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-sacred font-black text-[#042f2e] dark:text-white mb-8 tracking-tighter leading-[0.9]">
              The Noble <span className="text-[#a4773f] italic font-serif">Quran</span>
            </h2>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-800 dark:text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed px-6 font-sacred italic">
              Explore the divine wisdom through a cinematic lens. Unveil 114 Surahs with traditional calligraphy and modern reflection.
            </p>

            <div className="mt-12 flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-500">
               <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#a4773f] self-center opacity-40"></div>
               <Sparkles className="text-[#a4773f]" size={20} />
               <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#a4773f] self-center opacity-40"></div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="bento-card bg-red-50 dark:bg-red-950/20 text-red-600 p-12 text-center border-red-100 dark:border-red-900/30 max-w-xl mx-auto">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="text-red-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4 italic">Connection Interrupted</h3>
            <p className="font-medium mb-6">{error}</p>
            <a 
              href="/"
              className="px-8 py-3 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
            >
              Try Reconnecting
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 ease-out">
              {currentSurahs.map((surah) => (
                <SurahCard key={surah.number} surah={surah} />
              ))}
            </div>
            
            <div className="mt-20 flex justify-center">
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
