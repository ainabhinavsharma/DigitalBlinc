import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { name, email, adhaar, pan, account, ifsc } = req.body;
    const currentDate = new Date().toLocaleDateString('en-IN');

    // Load the docx file from public folder
    const templatePath = path.resolve('./public', 'Complete_Agreement.docx');
    const content = fs.readFileSync(templatePath, 'binary');

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Replace placeholders based on your document structure
    doc.render({
      name: name,
      adhaar: adhaar,
      pan: pan,
      email: email,
      account: account,
      ifsc: ifsc,
      date: currentDate,
      sign: name // Signature set to name in signature font
    });

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename=Agreement_${name}.docx`);
    return res.status(200).send(buf);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to generate document' });
  }
}