import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

// Una sola instancia del cliente de caché para toda la app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000 // datos frescos por 5 segundos
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)