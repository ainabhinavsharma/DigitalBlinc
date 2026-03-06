import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from '../components/SplashScreen';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import StepWizard from '../components/StepWizard';
import ProcessingState from '../components/ProcessingState';
import SelfieCamera from '../components/SelfieCamera';
import AgreementPDF from '../components/AgreementPDF';
import VerificationScreen from '../components/VerificationScreen';

export default function DigitalBlincPro() {
  const [screen, setScreen] = useState('splash');
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '', email: '', adhaar: '', pan: '', 
    bankName: '', account: '', ifsc: '', selfie: null
  });

  // Total steps for progress bar: Name, Email, Aadhaar, PAN, Bank, Account, IFSC, Selfie
  const totalSteps = 8;

  useEffect(() => {
    // 1. Initial Splash Screen
    const timer = setTimeout(() => setScreen('wizard'), 3000);
    return () => clearTimeout(timer);
  }, []);

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setScreen('processing');
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-white shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === 'splash' && <SplashScreen key="splash" />}

        {screen === 'wizard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
            <Header progress={(step / totalSteps) * 100} />
            <div className="flex-1 px-6 pt-10">
              <StepWizard 
                step={step} 
                data={formData} 
                updateData={(val) => setFormData({...formData, ...val})} 
              />
            </div>
            <Footer onNext={nextStep} step={step} data={formData} />
          </motion.div>
        )}

        {screen === 'processing' && (
          <ProcessingState key="proc" onComplete={() => setScreen('agreement')} />
        )}

        {screen === 'agreement' && (
          <AgreementPDF 
            key="pdf" 
            data={formData} 
            onDone={() => setScreen('verification')} 
          />
        )}

        {screen === 'verification' && (
          <VerificationScreen key="verify" data={formData} />
        )}
      </AnimatePresence>
    </div>
  );
}