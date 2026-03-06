import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User, Mail, Shield, CreditCard, Landmark, Hash } from 'lucide-react';

const CONFIG = {
  identity: [
    { id: 'name', label: 'Full Name', sub: 'Per your PAN card', icon: User, type: 'text' },
    { id: 'email', label: 'Email Address', sub: 'For loan documents', icon: Mail, type: 'email' },
    { id: 'adhaar', label: 'Aadhaar Number', sub: '12-digit UIDAI number', icon: Shield, type: 'tel', mask: '0000 0000 0000', len: 12 },
    { id: 'pan', label: 'PAN Card', sub: '10-digit alphanumeric', icon: CreditCard, type: 'text', len: 10, upper: true }
  ],
  bank: [
    { id: 'bank', label: 'Bank Name', sub: 'Disbursement bank', icon: Landmark, type: 'text' },
    { id: 'account', label: 'Account Number', sub: 'Primary savings/current', icon: Hash, type: 'tel' },
    { id: 'ifsc', label: 'IFSC Code', sub: '11-digit branch code', icon: Landmark, type: 'text', len: 11, upper: true }
  ]
};

export default function StepWizard({ mode, data, update, onComplete }) {
  const [stepIdx, setStepIdx] = useState(0);
  const steps = CONFIG[mode];
  const current = steps[stepIdx];

  const isValid = useMemo(() => {
    const val = data[current.id] || '';
    if (current.id === 'email') return /^\S+@\S+\.\S+$/.test(val);
    if (current.id === 'adhaar') return val.length === 12;
    if (current.id === 'pan') return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val.toUpperCase());
    if (current.id === 'ifsc') return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(val.toUpperCase());
    return val.length > 2;
  }, [data, current]);

  const handleNext = () => {
    if (stepIdx < steps.length - 1) setStepIdx(stepIdx + 1);
    else onComplete();
  };

  return (
    <div className="flex-1 flex flex-col p-8 pt-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          className="flex-1"
        >
          <div className="mb-10">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
              <current.icon className="text-indigo-600 w-6 h-6" />
            </div>
            <h2 className="question-header">{current.label}</h2>
            <p className="text-slate-400 font-medium">{current.sub}</p>
          </div>

          <input 
            autoFocus
            type={current.type}
            className="input-underline"
            placeholder="Type here..."
            value={data[current.id]}
            maxLength={current.len}
            onChange={(e) => update({ [current.id]: current.upper ? e.target.value.toUpperCase() : e.target.value })}
          />
        </motion.div>
      </AnimatePresence>

      <button 
        disabled={!isValid}
        onClick={handleNext}
        className={`w-full py-5 rounded-3xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl ${
          isValid ? 'bg-slate-900 text-white shadow-slate-200' : 'bg-slate-100 text-slate-300 cursor-not-allowed'
        }`}
      >
        Continue <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}