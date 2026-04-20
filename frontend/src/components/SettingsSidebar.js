'use client';

import React from 'react';
import { X, Type, Languages, Moon, Sun } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function SettingsSidebar({ isOpen, onClose }) {
  const { settings, updateSettings } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-sm w-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Type size={20} className="text-emerald-600" />
            Panel Settings
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={24} className="text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Font Family Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Languages size={16} />
              Arabic Font Family
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {['Amiri', 'Scheherazade New'].map((font) => (
                <button
                  key={font}
                  onClick={() => updateSettings({ arabicFont: font })}
                  className={`py-3 px-4 rounded-xl border-2 transition-all text-center font-medium ${
                    settings.arabicFont === font
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-slate-100 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <span style={{ fontFamily: font === 'Amiri' ? 'Amiri' : '"Scheherazade New"' }}>
                    بسم الله
                  </span>
                  <div className="text-xs mt-1 font-sans">{font}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Arabic Font Size Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Arabic Font Size</h3>
              <span className="text-emerald-600 font-bold">{settings.arabicFontSize}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="64"
              value={settings.arabicFontSize}
              onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>A</span>
              <span className="text-lg">A</span>
            </div>
          </section>

          {/* Translation Font Size Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Translation Font Size</h3>
              <span className="text-emerald-600 font-bold">{settings.translationFontSize}px</span>
            </div>
            <input
              type="range"
              min="12"
              max="24"
              value={settings.translationFontSize}
              onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </section>

          {/* Appearance Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Theme</h3>
            <div className="flex gap-4">
              <button
                onClick={() => updateSettings({ theme: 'light' })}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all ${
                  settings.theme === 'light'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-100 text-slate-600'
                }`}
              >
                <Sun size={18} />
                Light
              </button>
              <button
                onClick={() => updateSettings({ theme: 'dark' })}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all ${
                  settings.theme === 'dark'
                    ? 'border-emerald-500 bg-emerald-900/20 text-emerald-400'
                    : 'border-slate-100 text-slate-600'
                }`}
              >
                <Moon size={18} />
                Dark
              </button>
            </div>
          </section>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <p className="text-xs text-center text-slate-400 font-medium">
            Settings are automatically saved to your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
