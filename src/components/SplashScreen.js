import { motion } from 'framer-motion';

export default function SplashScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img src="/logo.png" alt="Logo" className="w-32 h-32 object-contain" />
      </motion.div>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "120px" }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="h-1 bg-indigo-600 mt-8 rounded-full"
      />
      <p className="mt-4 text-indigo-600 font-bold tracking-widest text-sm uppercase">Digital Blinc</p>
    </motion.div>
  );
}