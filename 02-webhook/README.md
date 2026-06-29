# PoC 02 — Webhook

## ¿Qué es?
Un Webhook es un callback HTTP — una forma en que un sistema notifica a otro
cuando ocurre un evento, enviando una petición POST a una URL registrada.
Es unidireccional y no mantiene conexión persistente.

## ¿Qué hace este PoC?
`server.js` levanta un servidor Express que escucha peticiones POST en /webhook
e imprime el payload recibido en consola.
`trigger.js` simula el disparo del webhook como lo haría Stripe, GitHub u otro
servicio externo.

## Cómo correrlo

### Terminal 1 — Levantar el servidor primero
node server.js

### Terminal 2 — Disparar el webhook
node trigger.js

## Resultado esperado
Terminal 1 imprime el evento recibido con todos sus datos y responde 200 OK.
Terminal 2 confirma que el servidor procesó el webhook correctamente.

## Relación con UCEConnect
Los Webhooks se pueden usar en UCEConnect para que Supabase notifique a
servicios externos cuando se registre un nuevo incidente en la base de datos.

## Archivos
- server.js  → servidor Express que recibe el webhook
- trigger.js → script que simula el disparo del evento externo