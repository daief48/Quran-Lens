import React from 'react';
import Header from '@/components/Header';
import AyahCard from '@/components/AyahCard';
import { fetchSurahs, fetchSurahDetails } from '@/lib/api';
import { Sparkles, Moon, Sun, Info } from 'lucide-react';

export async function generateStaticParams() {
  try {
    const surahs = await fetchSurahs();
    return surahs.map((surah) => ({
      id: surah.number.toString(),
    }));
  } catch (err) {
    console.error('Error generating static params', err);
    return [];
  }
}

export default async function SurahPage({ params }) {
  const { id } = await params;
  let surah = null;
  let error = null;

  try {
    surah = await fetchSurahDetails(id);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-pattern">
        <Header />
        <div className="max-w-4xl mx-auto p-10 text-center animate-in fade-in zoom-in duration-500">
          <div className="bento-card bg-red-50 dark:bg-red-950/20 text-red-600 p-12 border-red-100 dark:border-red-900/30">
            <h2 className="text-3xl font-extrabold mb-4 italic">Surah Not Found</h2>
            <p className="text-lg font-medium mb-8 opacity-70">{error}</p>
            <a href="/" className="px-10 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-900/20 inline-block">
              Return Home
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-32 bg-mashrabiya overflow-x-hidden relative">
      {/* Cinematic Deep Forest Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#042f2e]/20 via-transparent to-transparent pointer-events-none"></div>

      <Header />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Sacred Surah Detail Hero */}
        <div className="relative mb-20 p-10 sm:p-24 bento-card border-[#a4773f]/20 dark:bg-[#042f2e] bg-[#f0efe8] overflow-hidden shadow-[0_50px_100px_-20px_rgba(4,47,46,0.15)]">
          {/* Layered Cinematic Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-[#a4773f]/10 rounded-full blur-[100px] sm:blur-[150px] -mr-32 sm:-mr-64 -mt-32 sm:-mt-64 transition-all duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-emerald-500/5 rounded-full blur-[100px] sm:blur-[150px] -ml-32 sm:-ml-64 -mb-32 sm:-mb-64 transition-all duration-1000"></div>
          
          <div className="relative flex flex-col items-center text-center gap-10 sm:gap-16">
            <div className="flex items-center gap-4 sm:gap-8 animate-in fade-in slide-in-from-top-10 duration-700">
              <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#8a6335]/60 dark:to-[#a4773f]/40"></div>
              <div className="px-6 sm:px-10 py-2.5 sm:py-3 rounded-full border border-[#8a6335]/40 dark:border-[#a4773f]/30 bg-[#8a6335]/10 dark:bg-[#a4773f]/10 text-[#5c4225] dark:text-[#a4773f] font-sacred font-black text-[9px] sm:text-[11px] tracking-[0.4em] uppercase shadow-inner">
                The Divine Word
              </div>
              <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#8a6335]/60 dark:to-[#a4773f]/40"></div>
            </div>

            <div className="flex flex-col items-center gap-4 animate-in fade-in duration-1000 delay-200">
              <h2 className="text-5xl sm:text-8xl font-sacred font-black tracking-tight mb-2 italic leading-[0.85] text-[#042f2e] dark:text-white">
                {surah.englishName}
              </h2>
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#8a6335] dark:bg-amber-300 animate-pulse"></div>
                 <p className="text-[#8a6335] dark:text-amber-300 font-sacred font-bold tracking-[0.2em] uppercase text-xs sm:text-base italic">
                   {surah.englishNameTranslation}
                 </p>
                 <div className="w-1.5 h-1.5 rounded-full bg-[#8a6335] dark:bg-amber-300 animate-pulse"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl px-2 sm:px-4 animate-in fade-in zoom-in duration-1000 delay-500">
              {[
                { label: 'Revelation', value: surah.number },
                { label: 'Ayahs', value: surah.numberOfAyahs },
                { label: 'City', value: surah.revelationType },
                { label: 'Era', value: surah.revelationType === 'Meccan' ? 'Early' : 'Late' }
              ].map((stat, idx) => (
                <div key={idx} className="p-4 sm:p-6 rounded-[2rem] bg-[#8a6335]/5 dark:bg-white/10 border border-[#8a6335]/20 dark:border-white/20 flex flex-col items-center transition-all hover:bg-[#8a6335]/10 dark:hover:bg-white/15 group shadow-sm hover:border-[#8a6335]/40 dark:hover:border-amber-500/50">
                  <span className="text-[10px] sm:text-[11px] font-black text-[#5c4225] dark:text-amber-400 uppercase tracking-[0.2em] mb-2 transition-colors">{stat.label}</span>
                  <span className="text-lg sm:text-3xl font-sacred font-black text-[#042f2e] dark:text-white">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="text-6xl sm:text-9xl font-arabic text-[#042f2e] dark:text-emerald-300 mt-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300" style={{ fontFamily: 'var(--font-amiri)' }}>
              {surah.name}
            </div>

            {surah.number !== 1 && surah.number !== 9 && (
              <div className="mt-12 sm:mt-20 pt-12 sm:pt-20 border-t border-[#8a6335]/20 dark:border-white/10 w-full animate-in fade-in duration-1000 delay-700 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-[#f0efe8] dark:bg-[#042f2e] text-[#5c4225] dark:text-amber-400">
                   <Sparkles size={24} />
                </div>
                <div className="text-3xl sm:text-6xl font-arabic text-[#042f2e] dark:text-white leading-normal px-2" style={{ fontFamily: 'var(--font-amiri)' }}>
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
                <p className="text-[#5c4225] dark:text-amber-400 text-[10px] sm:text-[12px] font-sacred font-black uppercase tracking-[0.5em] mt-8 italic">In the Name of Allah, the Most Gracious, the Most Merciful</p>
              </div>
            )}
          </div>
        </div>

        {/* Ayahs List Container */}
        <div className="space-y-10">
          {surah.ayahs.map((ayah, i) => (
            <AyahCard 
              key={ayah.number} 
              ayah={ayah} 
              surahName={surah.englishName}
              surahNumber={surah.number}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
