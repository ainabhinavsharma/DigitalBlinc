import { useState } from 'react';
import { FileText, Download, Loader2, CheckCircle } from 'lucide-react';

export default function AgreementPDF({ data, onDone }) {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const generatePDF = async () => {
    setLoading(true);
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('pdf-content');
    
    const opt = {
      margin: 10,
      filename: `Agreement_${data.name.replace(/\s/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().from(element).set(opt).save();
    setLoading(false);
    setReady(true);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mb-6">
        <FileText className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="question-header text-center">Loan Agreement Ready</h2>
      <p className="text-slate-500 text-center mb-10">Review your repayment schedule for ₹3,50,000 starting April 2026.</p>

      <button 
        onClick={ready ? onDone : generatePDF}
        disabled={loading}
        className={`w-full py-5 rounded-3xl font-bold flex items-center justify-center gap-3 transition-all ${
          ready ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'
        }`}
      >
        {loading ? <Loader2 className="animate-spin" /> : (ready ? <CheckCircle /> : <Download />)}
        {loading ? "Generating..." : (ready ? "Proceed to Verification" : "Download Agreement PDF")}
      </button>

      {/* HIDDEN PREVIEW FOR PDF GENERATION */}
      <div className="hidden">
        <div id="pdf-content" className="p-10 text-[12px] leading-relaxed text-slate-800">
          <h1 className="text-xl font-bold border-b pb-4 mb-6">DIGITAL BLINC LOAN AGREEMENT</h1>
          <p className="mb-4">This agreement is made on <b>{new Date().toLocaleDateString('en-IN')}</b> between Digital Blinc (Lender) and <b>{data.name}</b> (Borrower).</p>
          
          <div className="bg-slate-50 p-4 rounded mb-6">
            <p><b>Loan Amount:</b> ₹3,50,000.00</p>
            <p><b>Tenure:</b> 48 Months</p>
            <p><b>EMI Amount:</b> ₹8,888.00</p>
            <p><b>First EMI Date:</b> 15-Apr-2026</p>
          </div>

          <table className="w-full border-collapse border border-slate-200 mb-6">
            <tr className="bg-slate-100 font-bold">
              <td className="border p-2">Borrower Name</td><td className="border p-2">{data.name}</td>
            </tr>
            <tr>
              <td className="border p-2">Aadhaar</td><td className="border p-2">XXXX-XXXX-{data.adhaar.slice(-4)}</td>
            </tr>
            <tr>
              <td className="border p-2">PAN</td><td className="border p-2">{data.pan}</td>
            </tr>
          </table>

          <div className="mt-20 flex justify-between items-end">
            <div className="border-t border-slate-400 pt-2 w-32 text-center text-[10px]">AUTHORIZED SIGNATORY</div>
            <div className="text-right">
               <p className="signature-font text-2xl text-indigo-600 mb-0">{data.name}</p>
               <div className="border-t border-slate-400 pt-2 w-48 text-center text-[10px]">BORROWER SIGNATURE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}