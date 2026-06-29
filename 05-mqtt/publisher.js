const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://broker.hivemq.com');

const TOPIC = 'uceconnect/incidentes';

client.on('connect', () => {
  console.log('Conectado al broker MQTT: broker.hivemq.com');

  const mensaje = {
    sistema: 'UCEConnect',
    evento: 'sensor_aula',
    datos: {
      aula: 'Laboratorio 3',
      temperatura: '22°C',
      ocupacion: 28,
      fecha: new Date().toISOString()
    }
  };

  client.publish(TOPIC, JSON.stringify(mensaje), () => {
    console.log('─────────────────────────────────');
    console.log('Mensaje publicado en topic:', TOPIC);
    console.log('Contenido:', JSON.stringify(mensaje, null, 2));
    console.log('─────────────────────────────────');
    client.end();
    console.log('Conexión cerrada.');
  });
});

client.on('error', (err) => {
  console.error('Error de conexión:', err.message);
});