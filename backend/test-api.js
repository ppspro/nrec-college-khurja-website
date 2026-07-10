const http = require('http');

const routes = [
  '/api/pages',
  '/api/departments',
  '/api/faculty',
  '/api/notices',
  '/api/events',
  '/api/gallery',
  '/api/downloads'
];

routes.forEach(route => {
  http.get('http://localhost:5005' + route, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`[${res.statusCode}] ${route} - ${data.substring(0, 50)}...`);
    });
  }).on('error', (err) => {
    console.log(`Error on ${route}: ${err.message}`);
  });
});
