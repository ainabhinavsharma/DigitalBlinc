import { useState } from 'react';
import { Landmark, Hash, digits } from 'lucide-react';

export default function BankDetailsScreen({ onComplete }) {
  const [bankData, setBankData] = useState({
    bankName: '', account: '', ifsc: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem('user_application'));
    const combinedData = { ...existingData, ...bankData };
    
    localStorage.setItem('user_application', JSON.stringify(combinedData));
    localStorage.setItem('bank_details_complete', 'true');
    onComplete();
  };

  const inputClass = "w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-gray-800";

  return (
    <div className="flex-1 p-6 flex flex-col justify-center">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Bank Disbursement</h2>
        <p className="text-gray-500 text-sm">Funds will be credited to this account upon final approval.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <Landmark className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
          <input required type="text" placeholder="Bank Name" className={inputClass}
            onChange={(e) => setBankData({...bankData, bankName: e.target.value})} />
        </div>

        <div className="relative">
          <Hash className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
          <input required type="text" placeholder="Account Number" className={inputClass}
            onChange={(e) => setBankData({...bankData, account: e.target.value})} />
        </div>

        <div className="relative">
          <Landmark className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
          <input required type="text" maxLength="11" placeholder="IFSC Code" className={`${inputClass} uppercase`}
            onChange={(e) => setBankData({...bankData, ifsc: e.target.value})} />
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
          <div className="w-2 h-2 bg-amber-400 rounded-full mt-1.5 shrink-0" />
          <p className="text-xs text-amber-800 leading-relaxed">
            Ensure the account belongs to <strong>{JSON.parse(localStorage.getItem('user_application'))?.name}</strong>. Third-party accounts are not allowed under Digital Blinc policy.
          </p>
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all mt-4">
          Proceed to Agreement
        </button>
      </form>
    </div>
  );
}