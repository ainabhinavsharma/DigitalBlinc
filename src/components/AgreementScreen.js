import { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';

export default function AgreementScreen({ onDownloaded }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    const userData = JSON.parse(localStorage.getItem('user_application'));

    try {
      const response = await fetch('/api/generate-agreement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Loan_Agreement_${userData.name}.docx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        
        // Short delay to ensure download started before moving to verification
        setTimeout(() => onDownloaded(), 2000);
      }
    } catch (error) {
      alert("Error generating document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
        <FileText className="w-10 h-10 text-indigo-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Agreement Ready</h2>
      <p className="text-gray-500 mb-8 px-4">
        Your loan agreement has been generated with your Aadhaar ({JSON.parse(localStorage.getItem('user_application'))?.adhaar}) and PAN details[cite: 14, 15].
      </p>

      <button 
        onClick={handleDownload}
        disabled={loading}
        className="w-full max-w-xs bg-indigo-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Download />}
        {loading ? 'Generating...' : 'Download Agreement'}
      </button>
      
      <p className="mt-6 text-xs text-gray-400">
        By downloading, you agree to pay Digital Blinc's service fees immediately[cite: 36, 60].
      </p>
    </div>
  );
}