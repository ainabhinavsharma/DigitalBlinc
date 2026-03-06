import { useRef, useState, useCallback } from 'react';
import { Camera, RefreshCw, Check } from 'lucide-react';

export default function SelfieCamera({ onCapture }) {
  const videoRef = useRef(null);
  const [img, setImg] = useState(null);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    videoRef.current.srcObject = s;
    setStream(s);
  };

  const capture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const data = canvas.toDataURL('image/jpeg');
    setImg(data);
    stream.getTracks().forEach(track => track.stop());
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-indigo-600 shadow-2xl relative bg-slate-100">
        {!img ? (
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
        ) : (
          <img src={img} className="w-full h-full object-cover scale-x-[-1]" />
        )}
      </div>

      {!img ? (
        <button onClick={stream ? capture : startCamera} className="bg-indigo-600 text-white p-6 rounded-full shadow-lg active:scale-90 transition-all">
          {stream ? <Camera /> : "Start Camera"}
        </button>
      ) : (
        <div className="flex gap-4">
          <button onClick={() => {setImg(null); startCamera();}} className="p-4 bg-slate-200 rounded-full"><RefreshCw /></button>
          <button onClick={() => onCapture(img)} className="p-4 bg-green-600 text-white rounded-full"><Check /></button>
        </div>
      )}
    </div>
  );
}