const amqp = require('amqplib');

const COLA = 'uceconnect-tareas';

async function run() {
  console.log('Conectando a RabbitMQ...');
  const conexion = await amqp.connect('amqp://localhost');
  const canal = await conexion.createChannel();

  await canal.assertQueue(COLA, { durable: false });

  console.log('─────────────────────────────────');
  console.log('Worker escuchando la cola:', COLA);
  console.log('Esperando mensajes... (corre producer.js en otra terminal)');
  console.log('─────────────────────────────────');

  canal.consume(COLA, (msg) => {
    if (msg !== null) {
      const contenido = JSON.parse(msg.content.toString());

      console.log('Mensaje recibido!');
      console.log('Tarea:', contenido.tarea);
      console.log('Datos:', JSON.stringify(contenido.datos, null, 2));
      console.log('Procesando tarea...');

      // Simula el trabajo (ej. generar PDF)
      setTimeout(() => {
        console.log('Tarea completada:', contenido.tarea);
        console.log('─────────────────────────────────');
        // ACK: le dice a RabbitMQ que el mensaje fue procesado
        canal.ack(msg);
      }, 2000);
    }
  });
}

run().catch(console.error);