# PoC 05 — MQTT

## ¿Qué hace?
`subscriber.js` se conecta a un broker público y se suscribe al topic
`uceconnect/incidentes`. `publisher.js` publica un mensaje en ese topic
y el subscriber lo recibe al instante.

No necesitas instalar nada extra — usa el broker público broker.hivemq.com.

## Cómo correrlo

### Terminal 1 — Correr el subscriber primero
node subscriber.js

### Terminal 2 — Correr el publisher
node publisher.js

## Nota
Como el broker es público, otros usuarios podrían publicar en el mismo
topic. En producción usarías un broker privado (ej. Mosquitto en Docker).

## Archivos
- subscriber.js → se suscribe al topic y recibe mensajes
- publisher.js  → publica un mensaje en el topic