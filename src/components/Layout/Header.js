import { ChevronLeft } from 'lucide-react';

export default function Header({ progress }) {
  return (
    <header className="px-6 pt-6 pb-2 bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between mb-4">
        <button className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-slate-800" />
        </button>
        <img src="/logo.png" alt="Digital Blinc" className="h-8 w-auto grayscale brightness-0" />
        <div className="w-10" /> {/* Spacer */}
      </div>
      
      {/* Dynamic Progress Bar */}
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]"
        />
      </div>
    </header>
  );
}