import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Activity, Search, Database } from 'lucide-react';

const STATUS_MSGS = [
  { icon: Search, text: "Verifying Identity with UIDAI..." },
  { icon: Database, text: "Fetching CIBIL Credit Report..." },
  { icon: Activity, text: "Running AI Risk Assessment..." },
  { icon: ShieldCheck, text: "Finalizing Loan Terms..." }
];

export default function ProcessingState({ onComplete }) {
  const [seconds, setSeconds] = useState(300); // 5 Minutes
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev === 30) { // At 4:30 mark (30 secs left)
           // Trigger OneSignal Push Notification Logic here
           console.log("Push Notification Sent: Assessment Complete!");
        }
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const msgTimer = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % STATUS_MSGS.length);
    }, 5000);

    return () => { clearInterval(timer); clearInterval(msgTimer); };
  }, []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const CurrentStatus = STATUS_MSGS[msgIdx];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-10 bg-slate-50/50">
      <div className="relative mb-12">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="w-48 h-48 border-2 border-dashed border-slate-200 rounded-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-900">{formatTime(seconds)}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Remaining</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={msgIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100"
        >
          <CurrentStatus.icon className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span className="text-sm font-semibold text-slate-600">{CurrentStatus.text}</span>
        </motion.div>
      </AnimatePresence>

      {seconds === 0 && (
        <motion.button 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={onComplete}
          className="mt-12 w-full bg-green-600 text-white font-extrabold py-5 rounded-3xl shadow-lg shadow-green-100 animate-bounce"
        >
          Assessment Complete · Next
        </motion.button>
      )}
    </div>
  );
}