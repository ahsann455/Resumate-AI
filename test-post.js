const fs = require('fs');
const http = require('http');
const path = require('path');

const filePath = path.join(process.cwd(), 'upload', 'test-cv.pdf');
const fileContent = fs.readFileSync(filePath);
const boundary = '----Boundary' + Date.now();

const fileFieldHeader = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="test-cv.pdf"\r\nContent-Type: application/pdf\r\n\r\n`;
const fileFieldFooter = `\r\n--${boundary}\r\nContent-Disposition: form-data; name="jobRole"\r\n\r\nSoftware Engineer\r\n--${boundary}--\r\n`;

const bodyBuffer = Buffer.concat([
  Buffer.from(fileFieldHeader),
  fileContent,
  Buffer.from(fileFieldFooter)
]);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/cv-evaluate',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': bodyBuffer.length
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => { 
    console.log('HTTP Status:', res.statusCode);
    console.log('Response:', data.substring(0, 2000));
  });
});

req.on('error', (err) => {
  console.error('Request Error:', err.message);
  process.exit(1);
});

req.setTimeout(120000, () => {
  req.destroy();
  console.error('Request timeout');
  process.exit(1);
});

req.write(bodyBuffer);
req.end();
