const express = require('express');
const app = express();
app.use(express.json());

// Endpoint que recibe el webhook
app.post('/webhook', (req, res) => {
  const { evento, datos } = req.body;

  console.log('─────────────────────────────────');
  console.log('Webhook recibido!');
  console.log('Evento:' , evento);
  console.log('Datos:' , datos);
  console.log('Hora:', new Date().toLocaleTimeString());
  console.log('─────────────────────────────────');

  res.status(200).json({ recibido: true, mensaje: 'Webhook procesado correctamente' });
});

app.listen(4000, () => {
  console.log('Webhook listener corriendo en http://localhost:4000/webhook');
  console.log('Esperando peticiones POST...');
});