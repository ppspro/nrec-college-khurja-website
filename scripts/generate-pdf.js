/**
 * NREC College CMS - PDF Generator Script
 * Generates Admin_User_Manual.pdf from the HTML manual using Puppeteer.
 * 
 * Usage: node scripts/generate-pdf.js
 * 
 * Prerequisites:
 *   - npm install puppeteer (already done)
 *   - Both frontend (port 3000) and backend (port 5000) should be running
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML_PATH = path.join(__dirname, '../CLIENT_HANDOVER/Admin_User_Manual.html');
const PDF_PATH = path.join(__dirname, '../CLIENT_HANDOVER/Admin_User_Manual.pdf');

async function generatePDF() {
  console.log('🚀 Starting PDF generation...');
  
  if (!fs.existsSync(HTML_PATH)) {
    console.error('❌ HTML file not found:', HTML_PATH);
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();
    
    // Load the HTML file via file:// protocol to resolve relative paths
    await page.goto('file://' + HTML_PATH, { waitUntil: 'networkidle0' });
    
    // Set viewport
    await page.setViewport({ width: 1200, height: 900 });

    // Generate PDF with professional settings
    await page.pdf({
      path: PDF_PATH,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 9px; font-family: Arial, sans-serif; color: #666; width: 100%; padding: 0 15mm; box-sizing: border-box; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: bold; color: #8B0E2A;">NREC College — Admin User Manual</span>
          <span>Version 1.0.0</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 9px; font-family: Arial, sans-serif; color: #666; width: 100%; padding: 0 15mm; box-sizing: border-box; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 4px;">
          <span>© 2026 NREC College Khurja. All Rights Reserved.</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `
    });

    console.log('✅ PDF generated successfully!');
    console.log('📄 Output:', PDF_PATH);
    console.log('📊 File size:', Math.round(fs.statSync(PDF_PATH).size / 1024), 'KB');

  } catch (error) {
    console.error('❌ PDF generation failed:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

generatePDF().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
