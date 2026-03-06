import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = ["Verifying Aadhaar (UIDAI)...", "CIBIL Record Analysis...", "Income Stability Check...", "AI Risk Scoring...", "Finalizing Sanction..."];

export default function ProcessingState({ onComplete }) {
  const [prog, setProg] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setProg(p => p >= 100 ? 100 : p + 0.34), 1000); // 5 mins
    const m = setInterval(() => setMsgIdx(p => (p + 1) % STEPS.length), 6000);
    return () => { clearInterval(t); clearInterval(m); };
  }, []);

  return (
    <div className="flex-1 flex flex-col p-8 items-center justify-center text-white">
      <div className="relative w-72 h-72 mb-16 flex items-center justify-center wait-glow rounded-full">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="144" cy="144" r="130" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="transparent" />
          <motion.circle cx="144" cy="144" r="130" stroke="#10b981" strokeWidth="8" fill="transparent" 
            strokeDasharray="816" strokeDashoffset={816 - (816 * prog) / 100} strokeLinecap="round" />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-7xl font-black tracking-tighter">{Math.floor(prog)}%</span>
          <span className="text-emerald-400 font-bold text-xs tracking-[0.3em]">ANALYSIS</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p key={msgIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="text-slate-400 font-medium text-center text-lg italic"
        >
          {STEPS[msgIdx]}
        </motion.p>
      </AnimatePresence>

      {prog >= 100 && (
        <motion.button initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onClick={onComplete}
          className="mt-16 w-full h-20 bg-emerald-500 text-[#0f172a] font-black rounded-[2.5rem] text-xl shadow-[0_20px_50px_rgba(16,185,129,0.3)]"
        >
          VIEW STATUS
        </motion.button>
      )}
    </div>
  );
}