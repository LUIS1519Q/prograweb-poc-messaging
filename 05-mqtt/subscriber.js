const mqtt = require('mqtt');

// Broker público gratuito — no necesitas instalar nada
const client = mqtt.connect('mqtt://broker.hivemq.com');

const TOPIC = 'uceconnect/incidentes';

client.on('connect', () => {
  console.log('Conectado al broker MQTT: broker.hivemq.com');
  client.subscribe(TOPIC, (err) => {
    if (!err) {
      console.log('─────────────────────────────────');
      console.log('Suscrito al topic:', TOPIC);
      console.log('Esperando mensajes... (corre publisher.js en otra terminal)');
      console.log('─────────────────────────────────');
    } else {
      console.error('Error al suscribirse:', err);
    }
  });
});

client.on('message', (topic, message) => {
  const contenido = JSON.parse(message.toString());
  console.log('Mensaje recibido!');
  console.log('Topic:', topic);
  console.log('Contenido:', JSON.stringify(contenido, null, 2));
  console.log('─────────────────────────────────');
});

client.on('error', (err) => {
  console.error('Error de conexión:', err.message);
});