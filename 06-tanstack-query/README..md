# PoC 06 — TanStack Query

## ¿Qué hace?
Una app React que fetchea posts desde una API pública, los cachea con
TanStack Query, y al crear uno nuevo invalida la caché automáticamente
para re-fetchear la lista sin que el usuario recargue la página.

## Conceptos demostrados
- useQuery     → fetchea y cachea datos del servidor
- useMutation  → maneja POST y acciones de escritura
- invalidateQueries → invalida la caché tras una mutación exitosa

## Cómo correrlo

### Entrar a la carpeta del cliente
cd client

### Instalar dependencias
npm install

### Correr en desarrollo
npm run dev

### Abrir en el navegador
http://localhost:5173

## Archivos clave
- client/src/main.jsx → configura QueryClientProvider
- client/src/App.jsx  → useQuery + useMutation en acción