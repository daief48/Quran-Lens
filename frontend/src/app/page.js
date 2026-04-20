import React, { Suspense } from 'react';
import Header from '@/components/Header';
import SurahList from '@/components/SurahList';
import { Sparkles, Compass } from 'lucide-react';

export default function Home() {
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

        <Suspense fallback={
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        }>
          <SurahList />
        </Suspense>
      </div>
    </main>
  );
}

