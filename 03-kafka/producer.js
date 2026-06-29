const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'uceconnect-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

async function run() {
  console.log('Conectando producer a Kafka...');
  await producer.connect();
  console.log('Producer conectado!');

  const mensaje = {
    sistema: 'UCEConnect',
    evento: 'nuevo_incidente',
    datos: {
      titulo: 'Problema con acceso al sistema',
      prioridad: 'alta',
      fecha: new Date().toISOString()
    }
  };

  await producer.send({
    topic: 'uceconnect-incidentes',
    messages: [
      { value: JSON.stringify(mensaje) }
    ]
  });

  console.log('─────────────────────────────────');
  console.log('Mensaje enviado al topic: uceconnect-incidentes');
  console.log('Contenido:', JSON.stringify(mensaje, null, 2));
  console.log('─────────────────────────────────');

  await producer.disconnect();
  console.log('Producer desconectado.');
}

run().catch(console.error);