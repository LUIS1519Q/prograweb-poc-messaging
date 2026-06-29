import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

// API pública gratuita para el PoC
const API = 'https://jsonplaceholder.typicode.com'

function App() {
  const queryClient = useQueryClient()
  const [nuevoPost, setNuevoPost] = useState({ title: '', body: '' })
  const [mensajeExito, setMensajeExito] = useState('')

  // ── QUERY: fetchea la lista de posts y la cachea ──────────────────────
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch(`${API}/posts?_limit=5`).then(res => res.json())
  })

  // ── MUTATION: simula crear un post nuevo ──────────────────────────────
  const mutation = useMutation({
    mutationFn: (data) =>
      fetch(`${API}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json()),

    onSuccess: (data) => {
      // Invalida la caché → TanStack Query re-fetchea automáticamente
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setMensajeExito(`Post creado con ID: ${data.id}`)
      setNuevoPost({ title: '', body: '' })
      setTimeout(() => setMensajeExito(''), 3000)
    }
  })

  function handleCrear() {
    if (!nuevoPost.title.trim()) return
    mutation.mutate(nuevoPost)
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial', padding: '0 1rem' }}>
      <h1 style={{ color: '#1a365d', borderBottom: '3px solid #2b6cb0', paddingBottom: '0.5rem' }}>
        PoC 06 — TanStack Query
      </h1>

      {/* ── FORMULARIO ── */}
      <div style={{ background: '#ebf4ff', padding: '1rem', borderRadius: 8, marginBottom: '1.5rem' }}>
        <h3 style={{ margin: '0 0 0.75rem', color: '#2b6cb0' }}>Crear nuevo post</h3>
        <input
          value={nuevoPost.title}
          onChange={e => setNuevoPost({ ...nuevoPost, title: e.target.value })}
          placeholder="Título"
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', boxSizing: 'border-box' }}
        />
        <input
          value={nuevoPost.body}
          onChange={e => setNuevoPost({ ...nuevoPost, body: e.target.value })}
          placeholder="Contenido"
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.75rem', boxSizing: 'border-box' }}
        />
        <button
          onClick={handleCrear}
          disabled={mutation.isPending}
          style={{ background: '#2b6cb0', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 4, cursor: 'pointer' }}
        >
          {mutation.isPending ? 'Creando...' : 'Crear post'}
        </button>
        {mensajeExito && (
          <p style={{ color: 'green', margin: '0.5rem 0 0' }}>{mensajeExito} — caché invalidada y re-fetcheada</p>
        )}
      </div>

      {/* ── LISTA DE POSTS ── */}
      <h3 style={{ color: '#2d3748' }}>Posts (desde caché de TanStack Query)</h3>

      {isLoading && <p>Cargando desde la API...</p>}
      {isError && <p style={{ color: 'red' }}>Error al cargar los posts.</p>}

      {posts.map(post => (
        <div key={post.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderLeft: '4px solid #2b6cb0', borderRadius: 4, padding: '0.75rem 1rem', marginBottom: '0.5rem' }}>
          <strong style={{ color: '#1a365d' }}>#{post.id} — {post.title}</strong>
          <p style={{ margin: '0.25rem 0 0', color: '#555', fontSize: '0.9rem' }}>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default App