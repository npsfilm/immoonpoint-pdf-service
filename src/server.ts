import express, { Request, Response } from 'express';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';  // ← Named import
import { PdfDocument } from './PdfDocument';
import { PdfDataSchema } from './utils/validators';
import type { PdfData } from './types';

const app = express();
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/generate', async (req: Request, res: Response) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.PDF_API_KEY) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const parseResult = PdfDataSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ 
        error: 'Validation failed', 
        details: parseResult.error.errors 
      });
      return;
    }
    
    const data: PdfData = parseResult.data;
    console.log(`Generating PDF for: ${data.contact.email}`);
    
    const pdfElement = React.createElement(PdfDocument, { data });
    
    // ✅ Named import von renderToBuffer
    const pdfBuffer = await renderToBuffer(pdfElement as React.ReactElement);
    const pdfBase64 = pdfBuffer.toString('base64');
    
    console.log(`PDF generated: ${pdfBuffer.length} bytes`);
    
    res.json({
      success: true,
      pdf: pdfBase64,
      size: pdfBuffer.length,
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`PDF Service running on port ${PORT}`);
});
