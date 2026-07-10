const http = require('http');

const payload = JSON.stringify({
  email: 'admin@nreccollege.ac.in',
  password: 'admin@123'
});

const options = {
  hostname: 'localhost',
  port: 5005,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response:', data);
    try {
      const json = JSON.parse(data);
      if (json.token) {
        console.log('Login successful, token received.');
      } else {
        console.log('Login failed: no token in response.');
      }
    } catch (e) {
      console.error('Failed to parse JSON response');
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(payload);
req.end();
