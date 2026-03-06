import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function ApprovalScreen({ onNext }) {
  return (
    <div className="flex-1 flex flex-col p-8 items-center justify-center text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
        className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-emerald-200"
      >
        <CheckCircle className="text-white w-12 h-12" />
      </motion.div>
      <h2 className="hero-text text-emerald-900">Application Approved</h2>
      <p className="text-emerald-700/60 font-medium text-lg mb-12">
        We have sanctioned a limit of <b>₹3,50,000</b>. To proceed with disbursement, please provide your bank details.
      </p>
      <button onClick={onNext} className="w-full h-20 bg-emerald-600 text-white font-black rounded-[2rem] text-xl">
        Add Bank Account
      </button>
    </div>
  );
}