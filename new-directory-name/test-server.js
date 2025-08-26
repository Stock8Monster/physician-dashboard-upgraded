// Quick test to check if port 9000 is accessible
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 9000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Server Status: ${res.statusCode}`);
  if (res.statusCode === 200 || res.statusCode === 304) {
    console.log('✅ Server is running on http://localhost:9000');
  }
});

req.on('error', (error) => {
  console.error('❌ Server not accessible:', error.message);
});

req.end();