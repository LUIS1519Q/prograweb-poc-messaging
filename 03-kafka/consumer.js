const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'uceconnect-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'grupo-uceconnect' });

async function run() {
  console.log('Conectando consumer a Kafka...');
  await consumer.connect();
  console.log('Consumer conectado!');

  await consumer.subscribe({
    topic: 'uceconnect-incidentes',
    fromBeginning: true
  });

  console.log('Escuchando mensajes en topic: uceconnect-incidentes');
  console.log('Esperando... (corre producer.js en otra terminal)');
  console.log('─────────────────────────────────');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const contenido = JSON.parse(message.value.toString());
      console.log('Mensaje recibido!');
      console.log('Topic:', topic);
      console.log('Partición:', partition);
      console.log('Contenido:', JSON.stringify(contenido, null, 2));
      console.log('─────────────────────────────────');
    }
  });
}

run().catch(console.error);