import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, CreditCard, Fingerprint, Landmark, Hash } from 'lucide-react';

const steps = [
  { id: 'name', label: 'What is your full name?', sub: 'Enter name as per your PAN card', icon: User, type: 'text', placeholder: 'John Doe' },
  { id: 'email', label: 'Email Address', sub: 'We will send the copy of agreement here', icon: Mail, type: 'email', placeholder: 'john@example.com' },
  { id: 'adhaar', label: 'Aadhaar Number', sub: '12-digit unique identity number', icon: Fingerprint, type: 'tel', placeholder: '0000 0000 0000', maxLength: 12 },
  { id: 'pan', label: 'PAN Card Number', sub: '10-digit alphanumeric card number', icon: CreditCard, type: 'text', placeholder: 'ABCDE1234F', maxLength: 10, uppercase: true },
  { id: 'bankName', label: 'Bank Name', sub: 'Where should we disburse the loan?', icon: Landmark, type: 'text', placeholder: 'HDFC Bank' },
  { id: 'account', label: 'Account Number', sub: 'Verify your bank account number', icon: Hash, type: 'tel', placeholder: '0000000000', maxLength: 18 },
  { id: 'ifsc', label: 'IFSC Code', sub: '11-digit branch identity code', icon: Landmark, type: 'text', placeholder: 'HDFC0001234', maxLength: 11, uppercase: true }
];

export default function StepWizard({ step, data, updateData }) {
  const current = steps[step];
  if (!current) return null;

  const Icon = current.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current.id}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
            <Icon className="text-indigo-600 w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
            {current.label}
          </h2>
          <p className="text-slate-500 font-medium">
            {current.sub}
          </p>
        </div>

        <div className="relative">
          <input
            autoFocus
            type={current.type}
            placeholder={current.placeholder}
            maxLength={current.maxLength}
            value={data[current.id] || ''}
            onChange={(e) => updateData({ [current.id]: current.uppercase ? e.target.value.toUpperCase() : e.target.value })}
            className="w-full text-2xl font-semibold py-4 bg-transparent border-b-2 border-slate-200 focus:border-indigo-600 outline-none transition-colors placeholder:text-slate-300"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}