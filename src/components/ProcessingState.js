import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Bell } from 'lucide-react';
import { sendNotification } from '../utils/onesignal';

export default function ProcessingState({ onComplete }) {
  const [seconds, setSeconds] = useState(300); // 5 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          sendNotification("User"); // Trigger OneSignal
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-10 bg-slate-50">
      <div className="relative mb-10">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="w-40 h-40 border-4 border-slate-200 border-t-indigo-600 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <ShieldCheck className="w-16 h-16 text-indigo-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Profile</h2>
      <p className="text-center text-slate-500 mb-8 leading-relaxed">
        Our AI is checking your credit history and legal standing per the Indian Contract Act, 1872[cite: 26].
      </p>

      <div className="bg-white px-8 py-4 rounded-3xl shadow-lg shadow-indigo-50 border border-slate-100 flex items-center gap-4">
        <span className="text-3xl font-mono font-black text-indigo-600">{formatTime(seconds)}</span>
      </div>

      {seconds === 0 && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-10 w-full">
           <button onClick={onComplete} className="w-full bg-green-600 text-white font-bold py-5 rounded-3xl shadow-xl animate-bounce">
              View Approval Documents
           </button>
        </motion.div>
      )}
    </div>
  );
}