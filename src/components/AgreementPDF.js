import { useState } from 'react';
import { FileText, Download, Loader2, CheckCircle } from 'lucide-react';

export default function AgreementPDF({ data, onDone }) {
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const generatePDF = async () => {
    setLoading(true);
    
    try {
      // FIX: Dynamically import html2pdf only on the client side
      const html2pdf = (await import('html2pdf.js')).default;

      const element = document.getElementById('agreement-content');
      const opt = {
        margin: [10, 10],
        filename: `DigitalBlinc_Agreement_${data.name.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().from(element).set(opt).save();
      
      setDownloaded(true);
      setLoading(false);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Error generating PDF. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8 flex flex-col items-center justify-center animate-in">
      <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
        <FileText className="w-10 h-10 text-indigo-600" />
      </div>

      <h2 className="text-3xl font-black text-slate-900 mb-2">Loan Approved</h2>
      <p className="text-slate-500 text-center mb-10 leading-relaxed">
        Your agreement for <b>₹3,50,000</b> is ready. Please download and review the repayment schedule before final verification.
      </p>

      {/* Main Action Button */}
      {!downloaded ? (
        <button 
          onClick={generatePDF} 
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-bold py-5 rounded-3xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Download className="w-5 h-5" />}
          {loading ? "Preparing PDF..." : "Download Final Agreement"}
        </button>
      ) : (
        <button 
          onClick={onDone}
          className="w-full bg-green-600 text-white font-bold py-5 rounded-3xl shadow-xl shadow-green-100 flex items-center justify-center gap-3 animate-bounce"
        >
          <CheckCircle className="w-5 h-5" />
          Continue to Verification
        </button>
      )}

      {/* --- HIDDEN PDF TEMPLATE --- */}
      <div className="hidden">
        <div id="agreement-content" className="p-12 text-slate-800 font-sans leading-normal">
          <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4 mb-8">
            <h1 className="text-2xl font-black uppercase tracking-tighter">Loan Agreement</h1>
            <p className="text-xs font-bold text-slate-500">Ref: DB/2026/PRO-{Math.floor(Math.random()*10000)}</p>
          </div>

          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase mb-2 text-indigo-600">1. Borrower Details</h3>
            <div className="grid grid-cols-2 gap-4 text-[12px] bg-slate-50 p-4 rounded-lg">
              <p><b>Name:</b> {data.name}</p>
              <p><b>Email:</b> {data.email}</p>
              <p><b>Aadhaar:</b> XXXX-XXXX-{data.adhaar.slice(-4)}</p>
              <p><b>PAN:</b> {data.pan}</p>
            </div>
          </section>

          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase mb-2 text-indigo-600">2. Disbursement Bank</h3>
            <div className="grid grid-cols-2 gap-4 text-[12px] border border-slate-100 p-4 rounded-lg">
              <p><b>Bank Name:</b> {data.bankName}</p>
              <p><b>IFSC:</b> {data.ifsc}</p>
              <p><b>A/c Number:</b> {data.account}</p>
            </div>
          </section>

          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase mb-2 text-indigo-600">3. Repayment Schedule (EMI)</h3>
            <table className="w-full text-[10px] text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-2">Installment</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Amount (EMI)</th>
                  <th className="border p-2">ROI</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">01</td><td className="border p-2">15-Apr-2026</td><td className="border p-2">₹8,888.00</td><td className="border p-2">18% p.a.</td></tr>
                <tr><td className="border p-2">02</td><td className="border p-2">15-May-2026</td><td className="border p-2">₹8,888.00</td><td className="border p-2">18% p.a.</td></tr>
                <tr className="bg-slate-50"><td className="border p-2" colSpan="4 text-center">... 46 Additional Installments follow ...</td></tr>
              </tbody>
            </table>
          </section>

          <section className="mt-12 flex justify-between items-end">
            <div className="text-[12px]">
              <p className="font-bold border-t border-slate-300 pt-2 uppercase">Lender Signature</p>
              <p className="text-slate-400 italic">Digital Blinc Authorized</p>
            </div>
            <div className="text-[12px] text-right">
              <p className="signature-font text-2xl text-indigo-600 mb-1">{data.name}</p>
              <p className="font-bold border-t border-slate-300 pt-2 uppercase">Borrower Signature</p>
              <p><b>Date:</b> {new Date().toLocaleDateString('en-IN')}</p>
            </div>
          </section>

          <footer className="mt-20 text-[8px] text-slate-400 text-center uppercase tracking-widest">
            This is a digitally signed document generated via the Digital Blinc Secure Portal.
          </footer>
        </div>
      </div>
    </div>
  );
}