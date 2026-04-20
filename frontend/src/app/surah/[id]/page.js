import React from 'react';
import Header from '@/components/Header';
import AyahCard from '@/components/AyahCard';
import { fetchSurahs, fetchSurahDetails } from '@/lib/api';

// For SSG
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
      <main>
        <Header />
        <div className="max-w-4xl mx-auto p-10 text-center">
          <div className="bg-red-50 text-red-600 p-8 rounded-2xl border border-red-100">
            <h2 className="text-xl font-bold mb-2">Failed to load Surah</h2>
            <p>{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6">
        {/* Surah Hero Header */}
        <div className="relative mb-12 p-10 rounded-[2rem] bg-emerald-600 overflow-hidden text-white shadow-2xl shadow-emerald-900/20">
          {/* Decorative background element */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-bold text-xl border border-white/20">
              {surah.number}
            </div>
            
            <div>
              <h2 className="text-4xl font-extrabold mb-1">{surah.englishName}</h2>
              <p className="text-emerald-50 font-medium tracking-wide uppercase text-sm">
                {surah.englishNameTranslation} • {surah.revelationType} • {surah.numberOfAyahs} Ayahs
              </p>
            </div>

            <div className="text-5xl font-arabic mt-4" style={{ fontFamily: 'Amiri' }}>
              {surah.name}
            </div>

            {surah.number !== 1 && surah.number !== 9 && (
              <div className="mt-8 pt-8 border-t border-white/10 w-full">
                <div className="text-3xl font-arabic" style={{ fontFamily: 'Amiri' }}>
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ayahs List */}
        <div className="space-y-6">
          {surah.ayahs.map((ayah) => (
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
