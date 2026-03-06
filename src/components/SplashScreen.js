import { motion } from 'framer-motion';

export default function SplashScreen() {
  return (
    <motion.div 
      exit={{ opacity: 0 }} 
      className="flex-1 flex flex-col items-center justify-center bg-white p-10"
    >
      <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 mb-8 border border-slate-50">
        <img src="/logo.png" alt="Digital Blinc" className="w-20 h-20 object-contain" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-black text-slate-900 tracking-tighter">Digital Blinc</h1>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <motion.div 
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-indigo-600"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}