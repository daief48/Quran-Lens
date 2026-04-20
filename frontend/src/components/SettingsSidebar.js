'use client';

import React from 'react';
import { X, Type, Languages, Moon, Sun, Sliders, Palette, Sparkles } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function SettingsSidebar({ isOpen, onClose }) {
  const { settings, updateSettings } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-all duration-500 ease-in-out" 
        onClick={onClose}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white dark:bg-slate-900 shadow-[0_0_100px_rgba(0,0,0,0.2)] flex flex-col transform transition-transform duration-500 ease-out border-l border-slate-100 dark:border-slate-800">
        <div className="p-8 flex items-center justify-between border-b border-slate-50 dark:border-slate-800/50">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <Sliders size={24} className="text-emerald-600" />
              Preferences
            </h2>
            <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">Customize your reading experience</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all group"
          >
            <X size={24} className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {/* Font Family Section */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <Languages size={14} className="text-emerald-600" />
              Arabic Script
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {['Amiri', 'Scheherazade New'].map((font) => (
                <button
                  key={font}
                  onClick={() => updateSettings({ arabicFont: font })}
                  className={`bento-card p-6 transition-all relative group ${
                    settings.arabicFont === font
                      ? 'border-emerald-500 ring-4 ring-emerald-500/10'
                      : 'hover:border-slate-300'
                  }`}
                >
                  <div 
                    className={`text-3xl mb-3 text-right leading-tight ${settings.arabicFont === font ? 'text-emerald-600' : 'text-slate-700 dark:text-slate-300'}`}
                    style={{ fontFamily: font === 'Amiri' ? 'var(--font-amiri)' : 'var(--font-scheherazade)' }}
                  >
                    بِسْمِ اللَّهِ
                  </div>
                  <div className="text-[10px] font-extrabold font-sans uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">
                    {font}
                  </div>
                  {settings.arabicFont === font && (
                    <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Sizing Section */}
          <section className="space-y-8">
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Type size={14} className="text-emerald-600" />
                  Arabic Scale
                </h3>
                <span className="text-xl font-black text-slate-800 dark:text-white">{settings.arabicFontSize}<span className="text-[10px] text-slate-400 ml-1">PX</span></span>
              </div>
              <input
                type="range"
                min="24"
                max="64"
                value={settings.arabicFontSize}
                onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Type size={14} className="text-emerald-600" />
                  Translation Scale
                </h3>
                <span className="text-xl font-black text-slate-800 dark:text-white">{settings.translationFontSize}<span className="text-[10px] text-slate-400 ml-1">PX</span></span>
              </div>
              <input
                type="range"
                min="14"
                max="28"
                value={settings.translationFontSize}
                onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </section>

          {/* Theme Section */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <Palette size={14} className="text-emerald-600" />
              Interface Theme
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => updateSettings({ theme: 'light' })}
                className={`flex-1 flex items-center justify-center gap-3 py-4 bento-card ${
                  settings.theme === 'light'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-4 ring-emerald-500/10'
                    : 'text-slate-500'
                }`}
              >
                <Sun size={18} />
                <span className="font-extrabold text-sm uppercase tracking-widest">Day</span>
              </button>
              <button
                onClick={() => updateSettings({ theme: 'dark' })}
                className={`flex-1 flex items-center justify-center gap-3 py-4 bento-card ${
                  settings.theme === 'dark'
                    ? 'border-emerald-600 bg-emerald-950 text-emerald-400 ring-4 ring-emerald-500/10'
                    : 'text-slate-500'
                }`}
              >
                <Moon size={18} />
                <span className="font-extrabold text-sm uppercase tracking-widest">Night</span>
              </button>
            </div>
          </section>
        </div>

        <div className="p-10 border-t border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="bento-card p-6 border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-slate-900 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Persistence On</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Settings auto-saved locally.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
