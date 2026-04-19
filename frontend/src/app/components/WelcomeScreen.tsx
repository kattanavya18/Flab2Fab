import { Heart, Activity, Cpu, Flame, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* SVG Fire/Heat Filter */}
      <svg className="absolute w-0 h-0">
        <filter id="heat-haze">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.01 0.05; 0.01 0.1; 0.01 0.05" dur="3s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        </filter>
      </svg>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flame-text {
          0%, 100% { color: #fb7185; filter: drop-shadow(0 -2px 4px #e11d48) url(#heat-haze); }
          50% { color: #fda4af; filter: drop-shadow(0 -5px 10px #f43f5e) url(#heat-haze); }
        }
        .animate-flame {
          display: inline-block;
          animation: flame-text 2s infinite ease-in-out;
          background: linear-gradient(to top, #e11d48, #fb7185);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}} />
      
      <div className="relative max-w-5xl w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Content - Personalized */}
          <div className="lg:col-span-5 text-left space-y-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
              AI Biological Assessment
            </div>
            
            <div className="space-y-6">
              <h1 className="text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.85]">
                From <span className="text-slate-700 italic">Flab</span><br />
                To <span className="animate-flame">Fab</span>.
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-sm font-medium">
                High-fidelity analysis of your current biological state. <br />
                <span className="text-slate-400">Decision-support for your next peak.</span>
              </p>
            </div>

            <button
              onClick={onStart}
              className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-accent/50 hover:scale-[1.02]"
            >
              RUN ANALYSIS
              <Activity className="ml-3 w-5 h-5 text-accent transition-transform group-hover:rotate-12" />
            </button>
          </div>

          {/* Feature Grid - Non-Commercial */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            <div className="col-span-2 sm:col-span-1 bg-white/[0.02] rounded-[2rem] p-8 border border-white/[0.05] hover:border-white/10 transition-all group">
              <div className="w-12 h-12 mb-6 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors">
                <Cpu className="w-6 h-6 text-slate-500 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">My Rhythm</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Mapping my biological patterns to find the perfect flow for my day.
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1 mt-0 sm:mt-12 bg-white/[0.02] rounded-[2rem] p-8 border border-white/[0.05] hover:border-white/10 transition-all group">
              <div className="w-12 h-12 mb-6 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-accent/30 transition-colors">
                <Flame className="w-6 h-6 text-slate-500 group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">My Heat</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Tracking the intensity of my efforts and the fire I put into my goals.
              </p>
            </div>

            <div className="col-span-2 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[2.5rem] p-10 border border-white/[0.05] relative overflow-hidden group">
              <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">My Evolution</h3>
                  <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                    This isn't a public app. It's my private roadmap to the best version of me.
                  </p>
                </div>
                <div className="hidden sm:flex w-16 h-16 bg-white/[0.02] border border-white/5 rounded-2xl items-center justify-center">
                  <Zap className="w-8 h-8 text-accent/50" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
