import { useState, useEffect } from 'react';
import { ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProcessingScreen({ onApproved }) {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const startTime = parseInt(localStorage.getItem('app_timestamp'));
    
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = 900 - elapsed;

      if (remaining <= 0) {
        setIsApproved(true);
        clearInterval(interval);
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
      {!isApproved ? (
        <>
          <div className="w-32 h-32 relative mb-8">
            <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Clock className="w-10 h-10 text-indigo-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Verifying Documents</h2>
          <p className="text-gray-500 mb-8">Digital Blinc is assessing your eligibility based on the Indian Contract Act, 1872[cite: 26, 78].</p>
          <div className="bg-gray-100 px-6 py-3 rounded-full font-mono text-xl font-bold text-indigo-600">
            {formatTime(timeLeft)}
          </div>
        </>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center scale-up-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Loan Approved!</h3>
            <p className="text-gray-500 mb-8">Your application has been approved. Please provide your bank details to generate the agreement[cite: 11].</p>
            <button 
              onClick={onApproved}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-colors"
            >
              Add Bank Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}