import { useState, useEffect } from 'react';
import { Download, Loader2 } from 'lucide-react';

export default function AgreementPDF({ data, onDone }) {
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    setLoading(true);
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('agreement-render');
    
    const opt = {
      margin: 10,
      filename: `Agreement_${data.name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().from(element).set(opt).save();
    
    // AUTOMATIC REDIRECT after 2 seconds
    setTimeout(() => {
      onDone();
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col p-8 items-center justify-center">
      <div className="hero-text text-center">Finalizing Disbursement</div>
      <p className="text-slate-400 text-center mb-12">Generating your official agreement with the April 2026 EMI schedule.</p>

      <button onClick={handleProcess} disabled={loading}
        className="w-full h-20 bg-indigo-600 text-white font-black rounded-[2rem] text-xl flex items-center justify-center gap-3"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Download />}
        {loading ? "Replacing Tags..." : "Download & Verify"}
      </button>

      {/* PIXEL PERFECT RENDERING OF YOUR DOCX CONTENT  */}
      <div className="hidden">
        <div id="agreement-render" className="p-10 text-[11px] leading-relaxed text-slate-900 bg-white font-serif">
          <h1 className="text-lg font-bold text-center mb-8">DIGITAL BLINC LOAN AGREEMENT</h1>
          <p className="mb-4"><b>Name:</b> {data.name}</p>
          <p className="mb-4"><b>Aadhaar Number:</b> XXXX-XXXX-{data.adhaar.slice(-4)}</p>
          <p className="mb-4"><b>PAN Number:</b> {data.pan}</p>
          <p className="mb-4"><b>Email Address:</b> {data.email}</p>
          
          <div className="my-8 border-y py-4">
             <h3 className="font-bold mb-2">LOAN DETAILS</h3>
             <p>Amount: ₹3,50,000 | EMI: ₹8,888 | Start Date: 15-Apr-2026</p>
          </div>

          <p className="mb-4"><b>Disbursement Bank:</b> {data.bank}</p>
          <p className="mb-8"><b>Account Number:</b> {data.account} | <b>IFSC:</b> {data.ifsc}</p>

          <div className="mt-20 flex justify-between">
            <div>
              <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
              <p className="signature-font text-3xl text-indigo-600 mt-2">{data.name}</p>
              <p className="border-t border-slate-300 pt-1 text-[9px] uppercase font-bold">Borrower Signature</p>
            </div>
            <div className="text-right">
              <p>Place: Noida</p>
              <p className="mt-12 border-t border-slate-300 pt-1 text-[9px] uppercase font-bold">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}