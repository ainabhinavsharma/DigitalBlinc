import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from '../components/SplashScreen';
import StepWizard from '../components/StepWizard';
import ProcessingState from '../components/ProcessingState';
import ApprovalScreen from '../components/ApprovalScreen';
import SelfieCamera from '../components/SelfieCamera';
import AgreementPDF from '../components/AgreementPDF';
import VerificationScreen from '../components/VerificationScreen';

export default function DigitalBlincPro() {
  const [screen, setScreen] = useState('splash'); 
  const [data, setData] = useState({ 
    name: '', email: '', adhaar: '', pan: '', 
    bank: '', account: '', ifsc: '', selfie: null 
  });

  useEffect(() => {
    const timer = setTimeout(() => setScreen('identity'), 3500);
    return () => clearTimeout(timer);
  }, []);

  const getTheme = () => {
    if (screen === 'wait') return 'bg-[#0f172a] text-white';
    if (screen === 'approval' || screen === 'agreement' || screen === 'verify') return 'bg-emerald-50';
    return 'bg-white';
  };

  return (
    <div className={`app-viewport ${getTheme()} transition-colors duration-1000`}>
      {/* HEADER: Text Only */}
      {screen !== 'splash' && (
        <header className="px-8 pt-8 pb-4 flex justify-between items-center z-10">
          <h1 className={`font-black text-xl tracking-tighter ${screen === 'wait' ? 'text-white' : 'text-slate-900'}`}>
            Digital Blinc
          </h1>
          <div className="flex gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${screen === 'wait' ? 'bg-emerald-400' : 'bg-indigo-600'} animate-pulse`} />
          </div>
        </header>
      )}

      <AnimatePresence mode="wait">
        {screen === 'splash' && <SplashScreen key="s" />}
        {screen === 'identity' && <StepWizard key="i" mode="identity" data={data} update={(v)=>setData({...data, ...v})} onComplete={()=>setScreen('wait')} />}
        {screen === 'wait' && <ProcessingState key="w" onComplete={()=>setScreen('approval')} />}
        {screen === 'approval' && <ApprovalScreen key="a" onNext={()=>setScreen('bank')} />}
        {screen === 'bank' && <StepWizard key="b" mode="bank" data={data} update={(v)=>setData({...data, ...v})} onComplete={()=>setScreen('selfie')} />}
        {screen === 'selfie' && <SelfieCamera key="sc" onCapture={(img)=>{setData({...data, selfie:img}); setScreen('agreement')}} />}
        {screen === 'agreement' && <AgreementPDF key="p" data={data} onDone={()=>setScreen('verify')} />}
        {screen === 'verify' && <VerificationScreen key="v" data={data} />}
      </AnimatePresence>

      {/* FOOTER: Copyright Only */}
      {screen !== 'splash' && (
        <footer className="p-6 text-center">
          <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-[0.4em]">
            © 2026 Digital Blinc · All Rights Reserved
          </p>
        </footer>
      )}
    </div>
  );
}