import { 
  TrendingUp, 
  Shield, 
  RotateCcw,
  Zap,
  Brain,
  ListChecks,
  Activity,
  Microscope,
  Sparkles
} from 'lucide-react';
import CircularProgress from './CircularProgress';
import { HealthData } from './HealthForm';
import { motion } from 'framer-motion';

export interface HealthResponse {
  score: number;
  category_label: string;
  category_color: string;
  bmi: string;
  ai_insight: string;
  reasons: { reason: string }[];
  metrics: Record<string, string>;
  actions: { index: number; text: string }[];
  shifts: { label: string; value: string; reason: string }[];
  impact_analysis: { gain: string; text: string; color: string }[];
}

interface ResultsDashboardProps {
  result: HealthResponse;
  onRestart: () => void;
}

export default function ResultsDashboard({ result, onRestart }: ResultsDashboardProps) {
  return (
    <div className="min-h-screen py-8 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-white">
              Analytical <span className="text-slate-500 font-medium italic underline decoration-accent/30 underline-offset-8">Verdict</span>
            </h1>
          </div>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            New Assessment
          </button>
        </div>

        {/* TOP: Health Score & AI Insight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 flex flex-col items-center justify-center text-center space-y-6"
          >
            <CircularProgress value={result.score} />
            <div className="space-y-1">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Health Score</div>
              <div className={`text-2xl font-black ${result.category_color} tracking-tighter`}>{result.category_label}</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 flex flex-col justify-center relative overflow-hidden group"
          >
            {result.ai_insight === 'AI_CAPACITY_REACHED' ? (
              <>
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-rose-500/20 transition-all duration-700" />
                <h3 className="text-xs font-black text-rose-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Shield className="w-3 h-3" /> System Status
                </h3>
                <div className="space-y-2">
                  <p className="text-xl text-white font-black leading-tight">
                    AI Compute <span className="text-rose-400">Exhausted</span>
                  </p>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Our neural processors are currently at peak capacity. Deep analytical insights are temporarily unavailable. Please try again in a few minutes.
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xs font-black text-accent uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Sparkles className="w-3 h-3" /> AI Insight
                </h3>
                <p className="text-xl text-white font-medium leading-relaxed italic">
                  "{result.ai_insight}"
                </p>
              </>
            )}
          </motion.div>
        </div>

        {/* MIDDLE: Why This Result & Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 space-y-6"
          >
            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Brain className="w-3 h-3 text-indigo-400" /> Why This Result
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.reasons.map((point, idx) => (
                <ReasonPoint key={idx} reason={point.reason} />
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 space-y-6"
          >
            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-3 h-3 text-emerald-400" /> Key Metrics
            </h3>
            <div className="space-y-4">
              {Object.entries(result.metrics).map(([key, value]) => (
                <MetricItem key={key} label={key} value={value} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ACTION AREA: Top 3 Actions & Strategic Shifts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-6 bg-accent/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-accent/20 space-y-6"
          >
            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
              <ListChecks className="w-3 h-3 text-accent" /> Top 3 Actions
            </h3>
            <div className="space-y-4">
              {result.actions.map((action) => (
                <ActionCard key={action.index} index={action.index} text={action.text} />
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-6 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 space-y-8"
          >
            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-3 h-3 text-accent" /> Strategic Shifts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.shifts.map((shift, idx) => (
                <ShiftItem key={idx} label={shift.label} value={shift.value} reason={shift.reason} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM: Impact Analysis */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10"
        >
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-2 mb-8">
            <TrendingUp className="w-3 h-3" /> Impact Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {result.impact_analysis.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className={`text-2xl font-black ${item.color} w-10`}>{item.gain}</div>
                <div className="text-slate-500 font-bold shrink-0">→</div>
                <div className="text-sm text-slate-300 font-bold uppercase tracking-tight">{item.text}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function MetricItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</div>
      <div className="text-white font-bold text-sm">{value}</div>
    </div>
  );
}

function ReasonPoint({ reason }: { reason: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
      <p className="text-xs text-slate-400 font-medium leading-relaxed">{reason}</p>
    </div>
  );
}

function ActionCard({ index, text }: { index: number, text: string }) {
  return (
    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-accent/30 transition-all">
      <div className="text-xs font-black text-accent">{index}</div>
      <p className="text-sm text-white font-bold tracking-tight">{text}</p>
    </div>
  );
}

function ShiftItem({ label, value, reason }: { label: string, value: string, reason: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{label}</div>
      <div className="text-white font-bold text-xs tracking-tight">{value}</div>
      <div className="text-[10px] text-accent italic font-medium opacity-70">Reason: {reason}</div>
    </div>
  );
}

