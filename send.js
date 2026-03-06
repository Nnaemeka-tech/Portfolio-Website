const fs = require('fs');
const http = require('http');

const payloadStr = fs.readFileSync('C:\\Users\\Nnaemeka\\Desktop\\payload_clean.json', 'utf8');

const options = {
    hostname: 'localhost',
    port: 5678,
    path: '/api/v1/workflows/0JTwv2s1ShlmWO2y',
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': 'n8n_api_8849ac1ae1c0a00d8ccba16cdd507fd22f07a78ef3a78917e35b0d0c64eb3074ece4bdf838de36e5200ecda2aede4803',
        'Content-Length': Buffer.byteLength(payloadStr)
    }
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(res.statusCode, data));
});

req.on('error', e => console.error(e));
req.write(payloadStr);
req.end();
