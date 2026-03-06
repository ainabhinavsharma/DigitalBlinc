import { motion } from 'framer-motion';
import { validate } from '../../utils/validation';

export default function Footer({ onNext, step, data }) {
  const currentId = ['name', 'email', 'adhaar', 'pan', 'bankName', 'account', 'ifsc'][step];
  
  const isValid = () => {
    const val = data[currentId];
    if (!val) return false;
    
    switch (currentId) {
      case 'name': return val.length > 3;
      case 'email': return validate.email(val);
      case 'adhaar': return validate.aadhaar(val);
      case 'pan': return validate.pan(val);
      case 'account': return validate.account(val);
      case 'ifsc': return validate.ifsc(val);
      case 'bankName': return val.length > 2;
      default: return true;
    }
  };

  return (
    <footer className="p-6 bg-white/80 backdrop-blur-md border-t border-slate-100">
      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={!isValid()}
        onClick={onNext}
        className={`w-full py-5 rounded-3xl font-bold text-lg transition-all shadow-xl shadow-indigo-100 ${
          isValid() 
            ? 'bg-indigo-600 text-white shadow-indigo-200' 
            : 'bg-slate-100 text-slate-400 grayscale cursor-not-allowed shadow-none'
        }`}
      >
        Continue
      </motion.button>
      <p className="text-center text-xs text-slate-400 mt-4 font-medium uppercase tracking-widest">
        Powered by Digital Blinc Secure v3.0
      </p>
    </footer>
  );
}