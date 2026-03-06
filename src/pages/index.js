import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from '../components/SplashScreen';
import StepWizard from '../components/StepWizard';
import ProcessingState from '../components/ProcessingState';
import SelfieCamera from '../components/SelfieCamera';
import AgreementPDF from '../components/AgreementPDF';
import VerificationScreen from '../components/VerificationScreen';

export default function DigitalBlinc() {
  const [screen, setScreen] = useState('splash'); 
  const [data, setData] = useState({ 
    name: '', email: '', adhaar: '', pan: '', 
    bank: '', account: '', ifsc: '', selfie: null 
  });

  useEffect(() => {
    const timer = setTimeout(() => setScreen('identity'), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-shell">
      {/* PERSISTENT HEADER */}
      {screen !== 'splash' && (
        <header className="p-6 border-b border-slate-50 flex justify-between items-center">
          <span className="font-extrabold text-lg tracking-tight text-slate-800">Digital Blinc</span>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </header>
      )}

      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {screen === 'splash' && <SplashScreen key="splash" />}
          
          {screen === 'identity' && (
            <StepWizard 
              key="id-steps"
              mode="identity" 
              data={data} 
              update={(v) => setData(prev => ({...prev, ...v}))} 
              onComplete={() => setScreen('wait')} 
            />
          )}

          {screen === 'wait' && (
            <ProcessingState key="wait" onComplete={() => setScreen('bank')} />
          )}

          {screen === 'bank' && (
            <StepWizard 
              key="bank-steps"
              mode="bank" 
              data={data} 
              update={(v) => setData(prev => ({...prev, ...v}))} 
              onComplete={() => setScreen('selfie')} 
            />
          )}

          {screen === 'selfie' && (
            <SelfieCamera key="selfie" onCapture={(img) => {
              setData(prev => ({...prev, selfie: img}));
              setScreen('agreement');
            }} />
          )}

          {screen === 'agreement' && (
            <AgreementPDF key="pdf" data={data} onDone={() => setScreen('verify')} />
          )}

          {screen === 'verify' && (
            <VerificationScreen key="verify" data={data} />
          )}
        </AnimatePresence>
      </main>

      {/* PERSISTENT FOOTER */}
      {screen !== 'splash' && (
        <footer className="p-4 bg-slate-50/50 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © 2026 Digital Blinc · Secure Lending Partner
          </p>
        </footer>
      )}
    </div>
  );
}