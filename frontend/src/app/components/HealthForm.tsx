import { useState, useEffect } from 'react';
import { 
  User, 
  Utensils, 
  Dumbbell, 
  Moon, 
  ChevronLeft,
  ArrowRight,
  Droplet,
  Brain,
  Check,
  ChevronUp,
  ChevronDown,
  Activity,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface HealthData {
  age: string;
  height: string;
  weight: string;
  diet: string;
  exercise: string;
  dailyActivity: string;
  waterIntake: string;
  sleep: string;
  stressLevel: string;
  goal: string;
}

interface HealthFormProps {
  onSubmit: (data: HealthData) => void;
  onBack: () => void;
}

const LINERS: Record<string, string[]> = {
  age: ["A fine vintage!", "The wisdom is real.", "Classic.", "Age is just a number, but data is forever."],
  height: ["Solid height.", "Perspective is everything.", "Noted.", "Perfectly balanced."],
  weight: ["Data point secured.", "Mass is energy.", "Got it.", "Pure mass."],
  diet: ["Awe hottiee, taste is subjective!", "Interesting mix.", "Food for thought!", "Data for the soul."],
  exercise: ["Getting that heart rate up!", "Pure power.", "The body thanks you.", "Elite energy."],
  waterIntake: ["Stay hydrated!", "Clear skin, clear mind.", "H2O is the way.", "Hydration is logic."],
  sleep: ["Recharging is vital.", "Rest is productive.", "The brain needs this.", "Dreaming in code."],
  stressLevel: ["We'll sort it out.", "Deep breaths.", "Peace is the goal.", "Calculated calm."],
  dailyActivity: ["Movement is life.", "Routine check.", "Got it.", "Steady state."],
  goal: ["Focus on the prize.", "Target locked.", "Ambition is key.", "Let's get there."],
};

export default function HealthForm({ onSubmit, onBack }: HealthFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentLiner, setCurrentLiner] = useState("");
  const [formData, setFormData] = useState<HealthData>({
    age: '',
    height: '',
    weight: '',
    diet: '',
    exercise: '',
    dailyActivity: '',
    waterIntake: '',
    sleep: '',
    stressLevel: '',
    goal: '',
  });

  const questions = [
    { id: 'age', label: 'How old are you?', type: 'number', icon: User, placeholder: 'Age', unit: 'years' },
    { id: 'height', label: 'What is your height?', type: 'number', icon: User, placeholder: 'Height', unit: 'cm' },
    { id: 'weight', label: 'What is your current weight?', type: 'number', icon: User, placeholder: 'Weight', unit: 'kg' },
    { id: 'diet', label: 'What does your daily plate look like?', type: 'multi-choice', icon: Utensils, options: ['Non-Veg', 'Balanced', 'Vegetarian', 'Vegan', 'High Protein', 'Mostly Processed'] },
    { id: 'exercise', label: 'How often do you challenge your body?', type: 'choice', icon: Dumbbell, options: ['Daily', 'Regularly (3-4x)', 'Moderate (1-2x)', 'Rarely', 'Never'] },
    { id: 'dailyActivity', label: 'What best describes your daily routine?', type: 'choice', icon: Activity, options: ['Mostly sitting (desk job)', 'Lightly active', 'Moderately active', 'Very active'] },
    { id: 'waterIntake', label: 'How much water do you drink?', type: 'choice', icon: Droplet, options: ['8+ glasses', '5-7 glasses', '3-4 glasses', 'Less than 3'] },
    { id: 'sleep', label: 'How much rest are you getting?', type: 'choice', icon: Moon, options: ['8+ hours', '7-8 hours', '6-7 hours', '5-6 hours', 'Less than 5'] },
    { id: 'stressLevel', label: 'Current stress level?', type: 'choice', icon: Brain, options: ['Low', 'Moderate', 'High', 'Very High'] },
    { id: 'goal', label: 'What is your primary goal?', type: 'choice', icon: Target, options: ['Weight Loss', 'Muscle Gain', 'Maintain Health', 'Improve Fitness'] },
  ];

  useEffect(() => {
    const liners = LINERS[questions[currentQuestion].id] || [];
    setCurrentLiner(liners[Math.floor(Math.random() * liners.length)]);
  }, [currentQuestion]);

  const updateField = (field: string, value: string) => {
    if (questions[currentQuestion].type === 'multi-choice') {
      const currentVal = (formData as any)[field] || '';
      const selections = currentVal ? currentVal.split(', ') : [];
      
      const newSelections = selections.includes(value)
        ? selections.filter((s: string) => s !== value)
        : [...selections, value];
      
      setFormData(prev => ({ ...prev, [field]: newSelections.join(', ') }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
      
      if (questions[currentQuestion].type === 'choice') {
        setTimeout(() => handleNext(value, field), 300);
      }
    }
  };

  const adjustNumber = (field: string, delta: number) => {
    const currentVal = Number((formData as any)[field]) || 0;
    const newVal = Math.max(0, currentVal + delta);
    updateField(field, newVal.toString());
  };

  const handleNext = (val?: string, field?: string) => {
    const currentId = questions[currentQuestion].id;
    const valueToCheck = val || (formData as any)[currentId];
    if (!valueToCheck) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const finalData = { ...formData, [field || currentId]: val || (formData as any)[currentId] };
      onSubmit(finalData as HealthData);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const current = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="max-w-xl w-full">
        
        {/* Progress & AI Liner */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Analysis Step {currentQuestion + 1} of {questions.length}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLiner}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-accent font-bold text-sm italic"
                >
                  {isLastQuestion && (formData as any)[current.id] ? "Phew.. let's analyze this." : currentLiner}
                </motion.div>
              </AnimatePresence>
            </div>
            <span className="text-xs font-bold text-accent">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <motion.div 
              className="bg-accent h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20">
                <current.icon className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
                {current.label}
              </h2>
            </div>

            <div className="space-y-4">
              {current.type === 'number' ? (
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 group">
                    <input
                      autoFocus
                      type="number"
                      value={(formData as any)[current.id]}
                      onChange={(e) => updateField(current.id, e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (formData as any)[current.id] && handleNext()}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-6 pr-24 py-6 text-3xl font-bold text-white outline-none focus:border-accent/50 focus:bg-white/[0.08] transition-all placeholder:text-slate-700"
                      placeholder={current.placeholder}
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                      <div className="w-[1px] h-8 bg-white/10 mx-2" />
                      <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                        {current.unit}
                      </span>
                    </div>
                  </div>
                  
                  {/* Custom Precision Dial Controls */}
                  <div className="flex flex-col gap-1 bg-white/5 border border-white/10 p-1 rounded-xl">
                    <button 
                      onClick={() => adjustNumber(current.id, 1)}
                      className="p-3 text-slate-500 hover:text-accent transition-all hover:bg-white/5 rounded-lg"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </button>
                    <div className="h-[1px] bg-white/10 mx-2" />
                    <button 
                      onClick={() => adjustNumber(current.id, -1)}
                      className="p-3 text-slate-500 hover:text-accent transition-all hover:bg-white/5 rounded-lg"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 max-h-[380px] overflow-y-auto pr-3 custom-scrollbar">
                  {current.options?.map((option) => {
                    const isSelected = ((formData as any)[current.id] || '').split(', ').includes(option);
                    return (
                      <button
                        key={option}
                        onClick={() => updateField(current.id, option)}
                        className={`group flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 ${
                          isSelected
                            ? 'bg-accent border-accent text-white shadow-[0_0_20px_rgba(251,113,133,0.3)]'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:bg-white/[0.08]'
                        }`}
                      >
                        <span className="text-lg font-bold">{option}</span>
                        {current.type === 'multi-choice' ? (
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            isSelected ? 'bg-white border-white' : 'border-white/20'
                          }`}>
                            {isSelected && <Check className="w-4 h-4 text-accent" />}
                          </div>
                        ) : (
                          <ArrowRight className={`w-5 h-5 transition-all ${
                            isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'
                          }`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          
          {(current.type === 'number' || current.type === 'multi-choice') && (
            <button
              disabled={!(formData as any)[current.id]}
              onClick={() => handleNext()}
              className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 shadow-xl"
            >
              {current.type === 'multi-choice' ? 'Confirm Selection' : 'Next Step'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
