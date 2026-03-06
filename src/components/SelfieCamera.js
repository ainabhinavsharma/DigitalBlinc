import { useRef, useState, useCallback } from 'react';
import { Camera, RefreshCw, Check, ShieldCheck } from 'lucide-react';

export default function SelfieCamera({ onCapture }) {
  const videoRef = useRef(null);
  const [img, setImg] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const startCamera = async () => {
    setIsActive(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    videoRef.current.srcObject = stream;
  };

  const capture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    setImg(canvas.toDataURL('image/jpeg'));
    videoRef.current.srcObject.getTracks().forEach(t => t.stop());
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-10">
        <h2 className="question-header">Final Verification</h2>
        <p className="text-slate-400 font-medium">Please take a clear selfie for ID matching</p>
      </div>

      <div className="w-64 h-64 rounded-full border-4 border-indigo-600 overflow-hidden bg-slate-100 shadow-2xl mb-12 relative">
        {!img ? (
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
        ) : (
          <img src={img} className="w-full h-full object-cover scale-x-[-1]" alt="Selfie" />
        )}
        {!isActive && !img && (
          <div className="absolute inset-0 flex items-center justify-center">
             <ShieldCheck className="w-12 h-12 text-slate-300" />
          </div>
        )}
      </div>

      <div className="w-full space-y-4">
        {!img ? (
          <button 
            onClick={isActive ? capture : startCamera}
            className="w-full bg-slate-900 text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-3"
          >
            <Camera className="w-5 h-5" />
            {isActive ? "Capture Photo" : "Start Camera"}
          </button>
        ) : (
          <div className="flex gap-4">
            <button onClick={() => { setImg(null); startCamera(); }} className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-3xl font-bold flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5" /> Retake
            </button>
            <button onClick={() => onCapture(img)} className="flex-1 bg-indigo-600 text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-2">
              <Check className="w-5 h-5" /> Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}