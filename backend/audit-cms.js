/**
 * Phase 6 - Step 2: Admin Panel & CMS Full API Audit
 * Tests all CMS endpoints including Auth, Pages, Departments,
 * Faculty, Notices, Events, Gallery, Downloads, Menus
 */

const http = require('http');

const BASE = 'http://localhost:5005';
let TOKEN = '';
let results = [];

function req(method, path, body, auth) {
  return new Promise((resolve) => {
    const payload = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: 'localhost',
      port: 5005,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        ...(auth ? { Authorization: `Bearer ${auth}` } : {}),
      },
    };

    const r = http.request(opts, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    r.on('error', (e) => resolve({ status: 0, error: e.message }));
    if (payload) r.write(payload);
    r.end();
  });
}

function check(label, res, expectStatus) {
  const ok = res.status === expectStatus;
  const icon = ok ? '✅' : '❌';
  console.log(`${icon} [${res.status}] ${label}`);
  if (!ok) console.log('   Response:', JSON.stringify(res.body).slice(0, 200));
  results.push({ label, status: res.status, ok });
  return ok;
}

async function run() {
  console.log('\n========================================');
  console.log('  NREC CMS API AUDIT - Phase 6 Step 2  ');
  console.log('========================================\n');

  // ─── AUTH ───────────────────────────────────────────────
  console.log('--- AUTH ---');
  let res = await req('POST', '/api/auth/login', { email: 'admin@nreccollege.ac.in', password: 'admin@123' });
  if (check('Admin Login', res, 200)) {
    TOKEN = res.body.token;
  }

  res = await req('GET', '/api/auth/profile', null, TOKEN);
  check('Get Profile', res, 200);

  // ─── HEALTH ──────────────────────────────────────────────
  console.log('\n--- HEALTH ---');
  res = await req('GET', '/api/health');
  check('Health Check', res, 200);

  // ─── PAGES ───────────────────────────────────────────────
  console.log('\n--- PAGES ---');
  res = await req('GET', '/api/pages');
  check('GET Pages', res, 200);
  const pagesCount = Array.isArray(res.body?.pages) ? res.body.pages.length : (Array.isArray(res.body) ? res.body.length : 0);
  console.log(`   Found ${pagesCount} pages`);

  // Try fetching a specific slug
  res = await req('GET', '/api/pages/about');
  check('GET Page by slug (about)', res, 200);

  // ─── DEPARTMENTS ─────────────────────────────────────────
  console.log('\n--- DEPARTMENTS ---');
  res = await req('GET', '/api/departments');
  check('GET Departments', res, 200);
  const deptCount = Array.isArray(res.body?.departments) ? res.body.departments.length : (Array.isArray(res.body) ? res.body.length : 0);
  console.log(`   Found ${deptCount} departments`);

  // ─── COURSES ─────────────────────────────────────────────
  console.log('\n--- COURSES ---');
  res = await req('GET', '/api/courses');
  check('GET Courses', res, 200);
  const courseCount = Array.isArray(res.body?.courses) ? res.body.courses.length : (Array.isArray(res.body) ? res.body.length : 0);
  console.log(`   Found ${courseCount} courses`);

  // ─── FACULTY ─────────────────────────────────────────────
  console.log('\n--- FACULTY ---');
  res = await req('GET', '/api/faculty');
  check('GET Faculty', res, 200);
  const facultyCount = Array.isArray(res.body?.faculty) ? res.body.faculty.length : (Array.isArray(res.body) ? res.body.length : 0);
  console.log(`   Found ${facultyCount} faculty members`);

  // ─── NOTICES ─────────────────────────────────────────────
  console.log('\n--- NOTICES ---');
  res = await req('GET', '/api/notices');
  check('GET Notices', res, 200);
  const noticesCount = Array.isArray(res.body?.notices) ? res.body.notices.length : (Array.isArray(res.body) ? res.body.length : 0);
  console.log(`   Found ${noticesCount} notices`);

  // Create a notice (requires auth)
  res = await req('POST', '/api/notices', {
    title: 'Test Notice - Phase 6 Audit',
    content: 'This is a test notice created during Phase 6 CMS audit.',
    category: 'General',
    isActive: true
  }, TOKEN);
  const noticeCreated = check('POST Create Notice (auth)', res, 201);
  let noticeId = res.body?.notice?._id || res.body?._id || null;

  if (noticeCreated && noticeId) {
    // Update it
    res = await req('PUT', `/api/notices/${noticeId}`, { title: 'Test Notice - Updated' }, TOKEN);
    check('PUT Update Notice', res, 200);

    // Delete it
    res = await req('DELETE', `/api/notices/${noticeId}`, null, TOKEN);
    check('DELETE Notice', res, 200);
  }

  // ─── NEWS ────────────────────────────────────────────────
  console.log('\n--- NEWS ---');
  res = await req('GET', '/api/news');
  check('GET News', res, 200);

  // ─── EVENTS ──────────────────────────────────────────────
  console.log('\n--- EVENTS ---');
  res = await req('GET', '/api/events');
  check('GET Events', res, 200);

  // ─── GALLERY ─────────────────────────────────────────────
  console.log('\n--- GALLERY ---');
  res = await req('GET', '/api/gallery');
  check('GET Gallery', res, 200);
  const galleryCount = Array.isArray(res.body?.gallery) ? res.body.gallery.length : (Array.isArray(res.body) ? res.body.length : 0);
  console.log(`   Found ${galleryCount} gallery items`);

  // ─── DOWNLOADS ───────────────────────────────────────────
  console.log('\n--- DOWNLOADS ---');
  res = await req('GET', '/api/downloads');
  check('GET Downloads', res, 200);

  // ─── SETTINGS ────────────────────────────────────────────
  console.log('\n--- SETTINGS ---');
  res = await req('GET', '/api/settings');
  check('GET Settings', res, 200);

  // ─── MENUS ───────────────────────────────────────────────
  console.log('\n--- MENUS ---');
  res = await req('GET', '/api/menus');
  check('GET Menus', res, 200);

  // ─── CURRICULUM ──────────────────────────────────────────
  console.log('\n--- CURRICULUM ---');
  res = await req('GET', '/api/curriculum');
  check('GET Curriculum', res, 200);

  // ─── CONTACT ─────────────────────────────────────────────
  console.log('\n--- CONTACT SUBMIT ---');
  res = await req('POST', '/api/contact', {
    name: 'Test User',
    email: 'test@test.com',
    subject: 'Phase 6 Audit Test',
    message: 'Testing contact form submission'
  });
  check('POST Contact Form', res, 201);

  // ─── SUMMARY ─────────────────────────────────────────────
  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  console.log('\n========================================');
  console.log(`  SUMMARY: ${passed} PASSED / ${failed} FAILED`);
  console.log('========================================');

  if (failed > 0) {
    console.log('\nFailed tests:');
    results.filter(r => !r.ok).forEach(r => console.log(`  ❌ [${r.status}] ${r.label}`));
  }
}

run();
