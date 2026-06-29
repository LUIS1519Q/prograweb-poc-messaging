# PoC 04 — RabbitMQ

## ¿Qué hace?
`producer.js` envía una tarea a la cola `uceconnect-tareas`.
`consumer.js` la recibe, la procesa y envía un ACK confirmando que terminó.
RabbitMQ corre localmente via Docker.

## Requisitos
- Docker Desktop instalado y corriendo

## Cómo correrlo

### Paso 1 — Levantar RabbitMQ
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

### Paso 2 — Panel visual (opcional)
Abre http://localhost:15672 → usuario: guest / contraseña: guest

### Terminal 1 — Correr el consumer primero
node consumer.js

### Terminal 2 — Correr el producer
node producer.js

### Detener RabbitMQ cuando termines
docker stop rabbitmq
docker rm rabbitmq

## Archivos
- producer.js → envía mensaje a la cola
- consumer.js → recibe, procesa y confirma con ACK