/**
 * Phase 6 - Step 7: End-to-End Integration Test
 * Tests full data flow: Create -> Read -> Update -> Delete for key CMS flows
 */

const http = require('http');

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
  if (!ok) console.log('   Response:', JSON.stringify(res.body || res.error || '').slice(0, 200));
  results.push({ label, status: res.status, ok });
  return ok;
}

async function run() {
  console.log('\n==========================================');
  console.log('  PHASE 6 - STEP 7: E2E INTEGRATION TEST');
  console.log('==========================================\n');

  // === AUTH FLOW ===
  console.log('--- [1] Auth Flow ---');
  let res = await req('POST', '/api/auth/login', { email: 'admin@nreccollege.ac.in', password: 'admin@123' });
  if (check('Admin Login', res, 200)) TOKEN = res.body.token;
  
  res = await req('GET', '/api/auth/profile', null, TOKEN);
  check('Get Admin Profile', res, 200);

  // === NOTICE CRUD FLOW ===
  console.log('\n--- [2] Notice CRUD Flow ---');
  res = await req('POST', '/api/notices', {
    title: 'E2E Test Notice - Integration',
    content: 'This is a notice created during E2E integration testing.',
    category: 'General',
    isActive: true,
    publishDate: new Date().toISOString().split('T')[0]
  }, TOKEN);
  const noticeCreated = check('Create Notice', res, 201);
  const noticeId = res.body?.notice?._id;

  if (noticeCreated && noticeId) {
    res = await req('GET', `/api/notices/${noticeId}`, null, TOKEN);
    check('Read Notice by ID', res, 200);

    res = await req('PUT', `/api/notices/${noticeId}`, { title: 'E2E Test Notice - Updated', isActive: false }, TOKEN);
    check('Update Notice', res, 200);

    res = await req('DELETE', `/api/notices/${noticeId}`, null, TOKEN);
    check('Delete Notice', res, 200);

    res = await req('GET', `/api/notices/${noticeId}`, null, TOKEN);
    check('Verify Notice Deleted (expect 404)', res, 404);
  }

  // === CONTACT INQUIRY FLOW ===
  console.log('\n--- [3] Contact Inquiry Flow ---');
  res = await req('POST', '/api/contact/inquiries', {
    name: 'Integration Test User',
    email: 'integration@test.com',
    subject: 'Integration Test Inquiry',
    message: 'Testing the contact form submission end-to-end.'
  });
  const inquiryCreated = check('Submit Contact Inquiry', res, 201);
  const inquiryId = res.body?.inquiry?._id;

  if (inquiryCreated && inquiryId) {
    res = await req('GET', '/api/contact/inquiries', null, TOKEN);
    check('Get All Inquiries (Admin)', res, 200);

    res = await req('PATCH', `/api/contact/inquiries/${inquiryId}`, { status: 'read' }, TOKEN);
    check('Update Inquiry Status', res, 200);
  }

  // === MENUS FLOW ===
  console.log('\n--- [4] Menus Flow ---');
  res = await req('GET', '/api/menus/main');
  check('Get Main Menu', res, 200);
  
  res = await req('GET', '/api/menus/footer');
  check('Get Footer Menu', res, 200);

  // === PAGES FLOW ===
  console.log('\n--- [5] Pages Flow ---');
  res = await req('GET', '/api/pages/about');
  check('Get About Page', res, 200);
  
  res = await req('GET', '/api/pages/history');
  check('Get History Page', res, 200);
  
  res = await req('GET', '/api/pages/admissions');
  check('Get Admissions Page', res, 200);

  // === DEPARTMENTS FLOW ===
  console.log('\n--- [6] Departments Flow ---');
  res = await req('GET', '/api/departments');
  check('Get All Departments', res, 200);
  
  const deptSlug = res.body?.departments?.[0]?.slug;
  if (deptSlug) {
    res = await req('GET', `/api/departments/${deptSlug}`);
    check('Get Department by Slug', res, 200);
  }

  // === SETTINGS FLOW ===
  console.log('\n--- [7] Settings Flow ---');
  res = await req('GET', '/api/settings');
  check('Get Settings', res, 200);

  res = await req('PUT', '/api/settings', { collegeName: 'NREC College' }, TOKEN);
  check('Update Settings (Admin)', res, 200);

  // === HEALTH CHECK ===
  console.log('\n--- [8] System Health ---');
  res = await req('GET', '/api/health');
  check('Health Endpoint', res, 200);

  // === SUMMARY ===
  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  console.log('\n==========================================');
  console.log(`  RESULT: ${passed} PASSED  /  ${failed} FAILED`);
  console.log('==========================================');

  if (failed > 0) {
    console.log('\n❌ Failed Tests:');
    results.filter(r => !r.ok).forEach(r => console.log(`  [${r.status}] ${r.label}`));
    process.exit(1);
  } else {
    console.log('\n🎉 All integration tests passed!');
  }
}

run().catch(console.error);
