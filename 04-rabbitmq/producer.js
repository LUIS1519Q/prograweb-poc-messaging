const amqp = require('amqplib');

const COLA = 'uceconnect-tareas';

async function run() {
  console.log('Conectando a RabbitMQ...');
  const conexion = await amqp.connect('amqp://localhost');
  const canal = await conexion.createChannel();

  // Si la cola no existe, la crea. Si ya existe, no hace nada.
  await canal.assertQueue(COLA, { durable: false });

  const mensaje = {
    tarea: 'generar_reporte_pdf',
    datos: {
      incidenteId: 42,
      solicitadoPor: 'Luis Paspuezán',
      fecha: new Date().toISOString()
    }
  };

  canal.sendToQueue(COLA, Buffer.from(JSON.stringify(mensaje)));

  console.log('─────────────────────────────────');
  console.log('Mensaje enviado a la cola:', COLA);
  console.log('Contenido:', JSON.stringify(mensaje, null, 2));
  console.log('─────────────────────────────────');

  // Espera un poco antes de cerrar para asegurar el envío
  setTimeout(async () => {
    await conexion.close();
    console.log('Conexión cerrada.');
  }, 500);
}

run().catch(console.error);