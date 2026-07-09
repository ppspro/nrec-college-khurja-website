const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = path.join(__dirname, '../frontend/public/screenshots');

const adminEmail = 'admin@nreccollege.ac.in';
const adminPassword = 'admin@123'; // The default seed password

const routes = [
  { path: '/admin/login', file: 'login.png' },
  { path: '/admin/dashboard', file: 'dashboard.png' },
  { path: '/admin/homepage', file: 'homepage.png' },
  { path: '/admin/pages', file: 'pages.png' },
  { path: '/admin/menus', file: 'menus.png' },
  { path: '/admin/media', file: 'media.png' },
  { path: '/admin/departments', file: 'departments.png' },
  { path: '/admin/courses', file: 'courses.png' },
  { path: '/admin/faculty', file: 'faculty.png' },
  { path: '/admin/curriculum', file: 'curriculum.png' },
  { path: '/admin/news', file: 'news.png' },
  { path: '/admin/notices', file: 'notices.png' },
  { path: '/admin/events', file: 'events.png' },
  { path: '/admin/gallery', file: 'gallery.png' },
  { path: '/admin/downloads', file: 'downloads.png' },
  { path: '/admin/settings', file: 'settings.png' }
];

async function capture() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  console.log('🚀 Starting screenshot capture...');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.setDefaultNavigationTimeout(120000);
  await page.setViewport({ width: 1280, height: 800 });

  // 1. Capture Login
  console.log('Navigating to login...');
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'load', timeout: 30000 });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'login.png') });
  console.log('✅ Captured login.png');

  // 2. Log in
  console.log('Authenticating...');
  await page.type('input[type="email"]', adminEmail);
  await page.type('input[type="password"]', adminPassword);
  await page.click('button[type="submit"]');
  
  // Wait for redirect to dashboard
  await page.waitForSelector('h1', { timeout: 15000 });
  
  // Set localStorage globally to prevent the Welcome Tour from popping up
  await page.evaluate(() => localStorage.setItem('nrec_admin_tour_seen', 'true'));
  
  await new Promise(r => setTimeout(r, 2000)); // allow time for client side transition
  
  // 3. Capture authenticated routes
  for (const route of routes.slice(1)) {
    console.log(`Navigating to ${route.path}...`);
    await page.goto(`http://localhost:3000${route.path}`, { waitUntil: 'load', timeout: 120000 });
    
    // Check if we hit a 404 or an unexpected page
    const content = await page.content();
    if (content.includes('404') && content.includes('This page could not be found')) {
      console.log(`❌ Skipping ${route.file} - 404 Page Not Found`);
      continue;
    }

    // Wait a bit extra to ensure API calls are done and loaders are gone
    await new Promise(r => setTimeout(r, 2000));
    
    await page.evaluate(() => {
      localStorage.setItem('nrec_admin_tour_seen', 'true');
      const skipBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Skip Tour'));
      if (skipBtn) skipBtn.click();
      
      // Force remove any remaining modal overlays
      const overlays = document.querySelectorAll('.fixed.z-\\[100\\]');
      overlays.forEach(o => o.remove());
      
      const toasts = document.querySelectorAll('[role="alert"], .Toastify');
      toasts.forEach(t => t.remove());
    });
    
    // Short wait to ensure DOM updates and animations have finished settling
    await new Promise(r => setTimeout(r, 500));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, route.file) });
    console.log(`✅ Captured ${route.file}`);
  }

  await browser.close();
  console.log('🎉 Screenshot capture complete!');
}

capture().catch(console.error);
