import { useState } from 'react';
import { User, Mail, CreditCard, Fingerprint } from 'lucide-react';

export default function ApplicationForm({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '', email: '', pan: '', adhaar: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user_application', JSON.stringify(formData));
    localStorage.setItem('app_timestamp', Date.now());
    onComplete(formData);
  };

  const inputClass = "w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-gray-800";

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
        <p className="text-gray-500">Provide details for your {formData.name || 'loan'} application[cite: 11, 78].</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User className="absolute left-4 top-4.5 text-gray-400 w-5 h-5" />
          <input required type="text" placeholder="Full Name as per PAN" className={inputClass}
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>

        <div className="relative">
          <Fingerprint className="absolute left-4 top-4.5 text-gray-400 w-5 h-5" />
          <input required type="text" maxLength="12" placeholder="Aadhaar Number" className={inputClass}
            onChange={(e) => setFormData({...formData, adhaar: e.target.value})} />
        </div>

        <div className="relative">
          <CreditCard className="absolute left-4 top-4.5 text-gray-400 w-5 h-5" />
          <input required type="text" maxLength="10" placeholder="PAN Card Number" className={`${inputClass} uppercase`}
            onChange={(e) => setFormData({...formData, pan: e.target.value})} />
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-4.5 text-gray-400 w-5 h-5" />
          <input required type="email" placeholder="Email Address" className={inputClass}
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <p className="text-xs text-blue-700 leading-relaxed">
            By clicking submit, you agree to our Terms & Conditions and understand that platform fees are non-refundable[cite: 5, 60, 67].
          </p>
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all">
          Verify & Continue
        </button>
      </form>
    </div>
  );
}