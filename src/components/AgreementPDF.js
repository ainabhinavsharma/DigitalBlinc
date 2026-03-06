import { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export default function AgreementPDF({ data, onDone }) {
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    setLoading(true);
    // 1. Fetch the docx from public folder [cite: 1-131]
    const response = await fetch('/api/generate-agreement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Logic: Server returns HTML/Doc content, we use html2pdf to save it
      const element = document.getElementById('agreement-preview');
      const opt = {
        margin: 10,
        filename: `Agreement_${data.name}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().from(element).set(opt).save().then(() => {
        setLoading(false);
        onDone();
      });
    }
  };

  return (
    <div className="flex-1 p-8 flex flex-col items-center justify-center">
      <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6">
        <FileText className="w-12 h-12 text-indigo-600" />
      </div>
      <h2 className="text-3xl font-bold mb-2">Review Agreement</h2>
      <p className="text-slate-500 text-center mb-10">Your loan for ₹3,50,000 has been approved. Download your PDF to continue[cite: 18].</p>

      {/* Hidden Preview for html2pdf conversion [cite: 13-16, 122, 130] */}
      <div id="agreement-preview" className="hidden p-10 bg-white text-[10px] leading-relaxed">
        <h1 className="text-xl font-bold mb-4">Digital Blinc Loan Agreement</h1>
        <p>Name: {data.name}</p>
        <p>Aadhaar: {data.adhaar}</p>
        <p>PAN: {data.pan}</p>
        <p>Bank: {data.bankName} | A/c: {data.account}</p>
        <p>IFSC: {data.ifsc}</p>
        <div className="mt-10 border-t pt-4">
          <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
          <p className="signature-font text-xl mt-2">{data.name}</p>
        </div>
      </div>

      <button onClick={generatePDF} disabled={loading} className="w-full bg-indigo-600 text-white font-bold py-5 rounded-3xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
        {loading ? <Loader2 className="animate-spin" /> : <Download />}
        {loading ? "Converting to PDF..." : "Download Final PDF"}
      </button>
    </div>
  );
}