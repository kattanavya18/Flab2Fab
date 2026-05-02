import { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import HealthForm, { HealthData } from './components/HealthForm';
import ResultsDashboard, { HealthResponse } from './components/ResultsDashboard';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<HealthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-redirect to home if we are at root
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home');
    }
  }, [location, navigate]);

  const handleStart = () => {
    navigate('/analysis');
  };

  const handleFormSubmit = async (data: HealthData) => {
    setHealthData(data);
    setIsLoading(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/v1/health/assess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAssessmentResult(result);
      setIsLoading(false);
      navigate('/results');
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setHealthData(null);
    setAssessmentResult(null);
    navigate('/home');
  };

  const handleBackToWelcome = () => {
    navigate('/home');
  };

  return (
    <div 
      className="min-h-screen text-foreground transition-colors duration-500 relative overflow-hidden"
      style={{ 
        background: 'radial-gradient(circle at top left, #1a1829 0%, #13111c 50%, #0d0d15 100%)' 
      }}
    >
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingScreen />
          </motion.div>
        ) : (
          <div className="w-full">
            <Routes location={location} key={location.pathname}>
              <Route path="/home" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <WelcomeScreen onStart={handleStart} />
                </motion.div>
              } />
              
              <Route path="/analysis" element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <HealthForm onSubmit={handleFormSubmit} onBack={handleBackToWelcome} />
                </motion.div>
              } />
              
              <Route path="/results" element={
                assessmentResult ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <ResultsDashboard result={assessmentResult} onRestart={handleRestart} />
                  </motion.div>
                ) : (
                  <Navigate to="/home" replace />
                )
              } />
              
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </div>
        )}
      </AnimatePresence>

      {/* Creator Credit */}
      <div className="fixed bottom-6 right-8 z-[60] pointer-events-none">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700/50">
          Architected by <span className="text-slate-500/50">Navya Katta</span>
        </div>
      </div>
    </div>
  );
}