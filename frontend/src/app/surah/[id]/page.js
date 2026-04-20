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
    <main className="min-h-screen pb-32 bg-pattern">
      <Header />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Modern Surah Detail Hero */}
        <div className="relative mb-12 sm:mb-20 p-8 sm:p-20 bento-card border-none bg-slate-900 dark:bg-emerald-950 overflow-hidden text-white shadow-2xl">
          {/* Layered Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-600/20 rounded-full blur-[80px] sm:blur-[120px] -mr-32 sm:-mr-48 -mt-32 sm:-mt-48 transition-all duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-400/10 rounded-full blur-[80px] sm:blur-[120px] -ml-32 sm:-ml-48 -mb-32 sm:-mb-48 transition-all duration-1000"></div>
          
          <div className="relative flex flex-col items-center text-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2 sm:gap-4 animate-in fade-in slide-in-from-top-10 duration-700">
              <div className="h-px w-8 sm:w-12 bg-emerald-500/30"></div>
              <div className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-extrabold text-[8px] sm:text-[10px] tracking-[0.3em] uppercase">
                Divine Revelation
              </div>
              <div className="h-px w-8 sm:w-12 bg-emerald-500/30"></div>
            </div>

            <div className="flex flex-col items-center gap-2 animate-in fade-in duration-1000 delay-200">
              <h2 className="text-4xl sm:text-7xl font-extrabold tracking-tight mb-2 italic leading-tight">
                {surah.englishName}
              </h2>
              <p className="text-emerald-400/80 font-bold tracking-widest uppercase text-[10px] sm:text-sm px-4">
                &mdash; {surah.englishNameTranslation} &mdash;
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl px-2 sm:px-4 animate-in fade-in zoom-in duration-1000 delay-500">
              {[
                { label: 'Order', value: surah.number },
                { label: 'Verses', value: surah.numberOfAyahs },
                { label: 'Origin', value: surah.revelationType },
                { label: 'Pages', value: Math.ceil(surah.numberOfAyahs / 10) }
              ].map((stat, idx) => (
                <div key={idx} className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center transition-all hover:bg-white/10 group">
                  <span className="text-[8px] sm:text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest mb-1 group-hover:text-emerald-400 transition-colors">{stat.label}</span>
                  <span className="text-base sm:text-lg font-extrabold">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="text-5xl sm:text-8xl font-arabic text-emerald-400 mt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300" style={{ fontFamily: 'var(--font-amiri)' }}>
              {surah.name}
            </div>

            {surah.number !== 1 && surah.number !== 9 && (
              <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-white/5 w-full animate-in fade-in duration-1000 delay-700">
                <div className="text-2xl sm:text-5xl font-arabic text-emerald-100/90 leading-normal px-2" style={{ fontFamily: 'var(--font-amiri)' }}>
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
                <p className="text-emerald-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.4em] mt-4">Begin with the name of Allah</p>
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
