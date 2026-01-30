import express from 'express';
import ReactPDF from '@react-pdf/renderer';
import { PdfDocument } from './PdfDocument';
import { PdfDataSchema } from './utils/validators';

const app = express();
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// PDF Generation Endpoint
app.post('/generate', async (req, res) => {
  // 1. API-Key prüfen
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.PDF_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // 2. Daten validieren
    const parseResult = PdfDataSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: parseResult.error.errors 
      });
    }
    
    const data = parseResult.data;
    
    // 3. PDF rendern
    console.log(`Generating PDF for: ${data.contact.email}`);
    const pdfBuffer = await ReactPDF.renderToBuffer(
      PdfDocument({ data })
    );
    
    // 4. Base64 zurückgeben
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
    
    console.log(`PDF generated: ${pdfBuffer.byteLength} bytes`);
    
    res.json({
      pdfBase64,
      size: pdfBuffer.byteLength,
      filename: `Angebot-ImmoOnPoint-${Date.now()}.pdf`,
    });
    
  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).json({ 
      error: 'PDF generation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PDF Service running on port ${PORT}`);
});
