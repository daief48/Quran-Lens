import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-mashrabiya flex flex-col items-center justify-center gap-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#042f2e]/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative group">
        {/* Divine Aura Background */}
        <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse transition-all duration-1000"></div>
        
        <div className="relative p-10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[3rem] border border-white/50 dark:border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] flex flex-col items-center">
          <div className="relative mb-6">
            <Loader2 className="animate-spin text-emerald-600" size={64} strokeWidth={1} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="text-amber-500 animate-pulse" size={24} />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-[#a4773f] font-sacred font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-2">
              Preparing Sacred Texts
            </p>
            <div className="flex gap-1.5 justify-center">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 animate-bounce" 
                  style={{ animationDelay: `${i * 150}ms` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Bottom Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#042f2e]/5 to-transparent"></div>
    </div>
  );
}
