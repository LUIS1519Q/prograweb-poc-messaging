# PoC 03 — Apache Kafka

## ¿Qué es?
Apache Kafka es una plataforma distribuida de streaming de eventos diseñada
para mover grandes volúmenes de datos entre sistemas de forma confiable.
Los mensajes se publican en topics y múltiples consumidores pueden leerlos
de forma independiente.

## ¿Qué hace este PoC?
`producer.js` publica un mensaje en el topic `uceconnect-incidentes`.
`consumer.js` se suscribe al mismo topic y lo recibe en tiempo real.
Kafka corre localmente via Docker.

## Requisitos
- Docker Desktop instalado y corriendo

## Cómo correrlo

### Paso 1 — Levantar Kafka con Docker
docker-compose up -d

### Paso 2 — Esperar 20 segundos y verificar
docker ps

### Terminal 1 — Correr el consumer primero
node consumer.js

### Terminal 2 — Correr el producer
node producer.js

### Detener Kafka cuando termines
docker-compose down

## Resultado esperado
El consumer muestra el mensaje publicado por el producer con el topic,
la partición y el contenido completo del evento.

## Relación con UCEConnect
Kafka no es la tecnología elegida para UCEConnect por ser sobredimensionada
para la escala del proyecto. Sin embargo, sería la opción correcta si
UCEConnect creciera a una plataforma nacional con miles de eventos por segundo.

## Archivos
- docker-compose.yml → levanta Zookeeper + Kafka en Docker
- producer.js        → publica mensajes en el topic
- consumer.js        → se suscribe y recibe mensajes del topic