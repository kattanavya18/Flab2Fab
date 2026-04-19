import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Energy Blooms */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"
      />
      
      <div className="relative">
        {/* The Core Orb */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-accent via-primary to-accent p-[2px] shadow-[0_0_50px_rgba(99,102,241,0.3)]"
        >
          <div className="w-full h-full bg-background rounded-full flex items-center justify-center overflow-hidden relative">
            {/* Internal Energy Swirl */}
            <motion.div
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-accent/20 blur-xl"
            />
            
            {/* The Floating Spark */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#fff,0_0_40px_#fb7185] z-10"
            />
          </div>
        </motion.div>

        {/* Orbiting Particles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 pointer-events-none"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
              className="w-1.5 h-1.5 bg-accent rounded-full absolute -top-4 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#fb7185]"
            />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center space-y-3 relative z-10">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
          AI Analysis <span className="text-accent animate-pulse">Active</span>
        </h2>
        <div className="flex flex-col items-center gap-1">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.4em]">
            Syncing Biological Markers
          </p>
          <div className="flex gap-1 mt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 h-1 bg-accent rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
