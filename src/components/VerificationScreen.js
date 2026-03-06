import { MapPin, MessageSquare, ShieldCheck } from 'lucide-react';

export default function VerificationScreen({ data }) {
  const WHATSAPP_NUM = "918679357107";

  const handleOnline = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const msg = `Hi, I am ${data.name}. I need to complete my Online Home Verification. My Live Location: https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  };

  const handleOffline = () => {
    const msg = `Hi, I am ${data.name}. I request an Offline Verification agent to visit my address.`;
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="flex-1 flex flex-col p-8 pt-12 bg-white">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="text-indigo-600 w-8 h-8" />
        </div>
        <h2 className="question-header">Final Step</h2>
        <p className="text-slate-400">Choose your preferred home verification method to start disbursement.</p>
      </div>

      <div className="space-y-4">
        <button onClick={handleOnline} className="w-full p-6 bg-white border-2 border-indigo-50 rounded-[2rem] text-left flex items-center gap-5 hover:border-indigo-600 transition-all group">
          <div className="p-4 bg-indigo-50 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all"><MapPin /></div>
          <div>
            <h4 className="font-bold text-slate-800">Online Verification</h4>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Share GPS Location</p>
          </div>
        </button>

        <button onClick={handleOffline} className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-[2rem] text-left flex items-center gap-5 hover:border-slate-300 transition-all group">
          <div className="p-4 bg-white rounded-2xl text-slate-400 group-hover:text-slate-900 transition-all"><MessageSquare /></div>
          <div>
            <h4 className="font-bold text-slate-800">Offline Verification</h4>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Request Agent Visit</p>
          </div>
        </button>
      </div>
    </div>
  );
}