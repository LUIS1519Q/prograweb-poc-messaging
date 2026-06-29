const http = require('http');

// Simula el disparo del webhook (como si fuera Stripe, GitHub, etc.)
const payload = JSON.stringify({
  evento: 'nuevo_incidente',
  datos: {
    titulo: 'Problema en sala 3 — computadora sin funcionar',
    prioridad: 'alta',
    reportadoPor: 'Luis Paspuezán',
    fecha: new Date().toISOString()
  }
});

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/webhook',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Respuesta del servidor:', res.statusCode);
    console.log('Body:', body);
  });
});

req.on('error', (err) => {
  console.error('Error al disparar webhook:', err.message);
});

req.write(payload);
req.end();
console.log('Webhook disparado hacia http://localhost:4000/webhook');