# PoC 01 — WebSocket & Socket.io

## ¿Qué es?
WebSocket es un protocolo de comunicación bidireccional y persistente entre
cliente y servidor. Socket.io es una librería construida sobre WebSocket que
agrega reconexión automática, rooms y eventos con nombre.

## ¿Qué hace este PoC?
Un servidor NestJS emite un evento cada 3 segundos via Socket.io.
Un cliente HTML lo escucha y muestra los mensajes en pantalla en tiempo real
sin recargar la página.

## Cómo correrlo

### 1. Instalar dependencias
npm install

### 2. Iniciar el servidor
npx ts-node main.ts

### 3. Abrir el cliente
Abre client.html en el navegador (doble clic desde el explorador de archivos).

## Resultado esperado
Cada 3 segundos aparece un nuevo mensaje en el navegador con la hora actual,
sin ninguna recarga de página.

## Relación con UCEConnect
Socket.io se usará en UCEConnect para notificar a los usuarios en tiempo real
cuando se cree o actualice un incidente estudiantil.

## Archivos
- main.ts      → servidor NestJS con WebSocket Gateway
- client.html  → cliente HTML que escucha eventos del servidor
- tsconfig.json → configuración de TypeScript